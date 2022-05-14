import { MyRequest } from '../middleware/authorization'
import { postgresPool } from '../db'
import { Router } from 'express'
import sql from 'sql-template-strings'
import moment from 'moment'

export const meal = Router()

meal.get(
  '/meal',
  /**
   *
   * @param {MyRequest} req
   */
  async (req, res) => {
    // if (req.user.role !== 'restaurant') {
    //   return res.status(401).json({ error: 'you are not authorized' })
    // }
    try {
      const now = moment()
      const { rows } = await postgresPool.query(
        sql`
        SELECT
        *
        FROM
        meals
        WHERE
        created_at > ${now.unix()} AND end_at < ${now.unix()} 
      `
      )
      if (rows.length !== 0) {
        return res.json({ meal: rows[0] })
      }

      const { rows: s } = await postgresPool.query(
        sql`
      SELECT
      label, value
      FROM
      settings
      `
      )

      const settings = genSettings(s)
      let selectedMeal = undefined
      let selectedLabel = undefined
      for (const k of ['breakfast', 'lunch', 'dinar']) {
        const wantedMoment = moment()
          .startOf('day')
          .add(settings[k].stops.split(':')[0], 'hours')
          .add(settings[k].stops.split(':')[1], 'minutes')

        if (now.isBefore(wantedMoment)) {
          selectedMeal = settings[k]
          selectedLabel = k
          break
        }
      }

      if (selectedMeal === void 0) {
        return res.status(404).json({ error: 'no meal left for today' })
      }

      const startsMoment = moment()
        .startOf('day')
        .add(selectedMeal.starts.split(':')[0], 'hours')
        .add(selectedMeal.starts.split(':')[1], 'minutes')
      if (now.isSameOrAfter(startsMoment)) {
        const endMoment = moment()
          .startOf('day')
          .add(selectedMeal.stops.split(':')[0], 'hours')
          .add(selectedMeal.stops.split(':')[1], 'minutes')
        const { rows } = await postgresPool.query(
          sql`
        INSERT
        INTO
        meals
        (label, created_at, end_at)
        VALUES
        (${selectedLabel}, ${moment().unix()}, ${endMoment.unix()})
        RETURNING id, label, created_at, end_at
        `
        )
        return res.json({ meal: { ...rows[0], ...selectedMeal } })
      }

      return res.json({ selectedMeal, selectedLabel })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'server issue' })
    }
  }
)

meal.post(
  '/check',
  /**
   *
   * @param {MyRequest} req
   */
  async (req, res) => {
    try {
      const { userID, mealID } = req.body
      const { rows } = await postgresPool.query(sql`
      SELECT
      *
      FROM
      students_meals
      WHERE user_id = ${userID} AND meal_id = ${mealID}
    `)
      if (rows.length !== 0) {
        return res.status(401).json({ error: 'member already' })
      }

      const {
        rows: { 0: a },
      } = await postgresPool.query(sql`
      INSERT INTO
      students_meals
      (user_id, meal_id)
      VALUES
      (${userID}, ${mealID})
      RETURNING *
      `)
      res.json({ ...a })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'servre issue' })
    }
  }
)

export function genSettings(settings) {
  return settings.reduce((p, e) => ({ ...p, [e.label]: e.value }), {})
}
