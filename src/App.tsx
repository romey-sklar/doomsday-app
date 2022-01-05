import * as React from 'react'
import { useState } from 'react'
import './App.css'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

export default function App() {
  const [date, setDate] = useState(new Date());
  return (
    <div>
      <h1>The Doomsday Machine</h1>
      <DatePicker selected={date} onChange={(date) => setDate(date)} />
      {date && calculateDoomsDayAlgorithm(date)}
    </div>
  )
}

const calculateDoomsDayAlgorithm = (date: Date) => {
  var month = date.getUTCMonth() + 1; //months from 1-12
  var day = date.getUTCDate();
  var year = date.getUTCFullYear();

  const last2DigitsOfYear = (year % 100)
  const step1Result = Math.floor(last2DigitsOfYear / 12)
  const step2Result = last2DigitsOfYear - (step1Result * 12)
  const step3Result = Math.floor(step2Result / 4)
  const step4Result = getAnchorDayForCentury(year)

  const sumOfSteps1Thru4 = step1Result + step2Result + step3Result + step4Result

  const doomsdayNumberForYear = sumOfSteps1Thru4 % 7
  const doomsdayForYear = getDayOfWeekFromNumber(doomsdayNumberForYear)

  const doomsdayAnchor = getDoomsdayByMonth(month, year)

  return (
    <div>
      <div className="step">Step 1: {step1Result}</div>
      <div className="step">Step 2: {step2Result}</div>
      <div className="step">Step 3: {step3Result}</div>
      <div className="step">Step 4: {step4Result}</div>
      <div className="step">
        <div>Step 5: Add all the previous results together</div>
        <div>{step1Result} + {step2Result} + {step3Result} + {step4Result} = <b>{sumOfSteps1Thru4}</b> </div>
      </div>
      <div className="step">
        <div>Step 6: Find doomsday by finding how many times 7 goes in to the result of step 5</div>
        <div>{sumOfSteps1Thru4} % 7 = <b>{doomsdayNumberForYear}</b> which is a {doomsdayForYear}</div>
      </div>
      <div className="step">
        {doomsdayAnchor} => {month}/{doomsdayAnchor} is a {doomsdayForYear}
      </div>
    </div>
  )
}

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const getDayOfWeekFromNumber = (dayNumber: number) => {
  return days[dayNumber]
}

const getAnchorDayForCentury = (year: number) => {
  const century = Math.floor(year / 100)
  if (century === 18) {
    return 6 // Friday
  } else if (century === 19) {
    return 3 // Wednesday
  } else if (century === 20) {
    return 2 // Tuesday
  } else if (century === 21) {
    return 0 // Sunday
  } else {
    throw Exception("Can't do years before 1800 currently")
  }
}

/*
January 3
February 28
April 4
May 9
June 6
July 11
August 8
September 5
October 10
November 7
December 12
 */
const getDoomsdayByMonth = (month: number, year: number) => {
  switch(month) {
    case 1: 
      return isLeapYear(year) ? 4 : 3
    case 2:
      return isLeapYear(year) ? 29 : 28
    case 3:
      return 14
    case 4:
      return 4
    case 5:
      return 9
    case 6:
      return 6
    case 7:
      return 11
    case 8:
      return 8
    case 9:
      return 5
    case 10:
      return 10
    case 11:
      return 7
    case 12:
      return 12
    default:
      return -1
  }
}

const isLeapYear = (year: number) => {
  return year % 4 === 0
}