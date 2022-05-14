import { Grid, Typography } from '@mui/material'
import Page from '../../app/page'
import Loading from '../../app/Loading'
import { useEffect, useRef, useState } from 'react'
import moment from 'moment'
import MealScanner from '../../app/Meal'

const Meals = () => {
  const [isLoading, setLoading] = useState(false)
  const [meal, setMeal] = useState(void 0)
  const [timer, setTimer] = useState(void 0)
  const loadingRef = useRef(false)

  function getMeal() {
    setLoading(true)
    fetch('http://localhost:3000/meal', {
      headers: { authorization: window.localStorage.getItem('id-token') },
    })
      .then((e) => e.json())
      .then(setMeal)
      .finally(() => setLoading(false))
  }

  function checkStudent(userID) {
    if (loadingRef.current) return

    loadingRef.current = true
    return fetch('http://localhost:3000/check', {
      body: JSON.stringify({ userID, mealID: meal?.meal?.id }),
      headers: {
        authorization: window.localStorage.getItem('id-token'),
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
      .then((e) => {
        if (e.ok) {
          return e.json()
        }

        return e.json().then((e) => {
          throw new Error(e.error)
        })
      })
      .finally(() => {
        setTimeout(() => (loadingRef.current = false), 10000)
      })
  }

  useEffect(() => {
    getMeal()
  }, [])

  useEffect(() => {
    if (!meal) {
      return
    }

    if ('selectedMeal' in meal) {
      const {
        selectedMeal: { starts },
        selectedLabel,
      } = meal
      const startsMoment = moment()
        .startOf('day')

        .add(starts.split(':')[0], 'hours')
        .add(starts.split(':')[1], 'minutes')

      const interval = setInterval(() => {
        const diff = startsMoment.diff(moment(), 'seconds')
        const time = moment('2015/04/01').seconds(diff).format('HH:mm:ss')
        setTimer({ label: selectedLabel, time })
        if (diff <= 0) {
          getMeal()
          clearInterval(interval)
        }
      }, 1000)
      return () => {
        clearInterval(interval)
      }
    }

    if ('error' in meal) {
      setTimer({ label: meal.error, time: void 0 })
      return
    }

    if ('meal' in meal) {
      const { stops, label } = meal.meal
      const startsMoment = moment()
        .startOf('day')

        .add(stops.split(':')[0], 'hours')
        .add(stops.split(':')[1], 'minutes')

      const interval = setInterval(() => {
        const diff = startsMoment.diff(moment(), 'seconds')
        const time = moment('2015/04/01').seconds(diff).format('HH:mm:ss')
        setTimer({ label, time })
        if (diff <= 0) {
          getMeal()
          clearInterval(interval)
        }
      }, 1000)
      return () => {
        clearInterval(interval)
      }
    }
  }, [meal])

  return (
    <Page title="Meals">
      <Grid container>
        {isLoading && (
          <Grid xs={12} item>
            <Loading />
          </Grid>
        )}
        {!isLoading && (
          <Grid xs={12} justifyContent="center" item container>
            {timer?.label && (
              <Grid xs={12} item>
                <Typography
                  sx={{
                    textAlign: 'center',
                    fontSize: timer.time ? 32 : 48,
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    padding: timer.time ? 5 : 10,
                  }}
                  time={timer.time}
                >
                  {timer.label}
                </Typography>
              </Grid>
            )}

            {timer?.time && (
              <Grid xs={12} item>
                <Typography
                  sx={{
                    color: meal?.meal ? 'red' : 'black',
                    textAlign: 'center',
                    fontSize: 48,
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                  }}
                >
                  {timer.time}
                </Typography>
              </Grid>
            )}

            {meal?.meal && (
              <Grid item>
                <MealScanner onCheck={checkStudent} />
              </Grid>
            )}
          </Grid>
        )}
      </Grid>
    </Page>
  )
}

export default Meals
