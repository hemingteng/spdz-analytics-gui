/**
 * Display the results from the sumlookup analytic function.
 * Very specifc to the particular cyber query.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'
import { Bar } from 'react-chartjs-2'

/* Needed to constrain canvas. */
const SizeDiv = styled.div`height: 250px;`

const HeadingLayout = styled.div`padding-bottom: 10px;`

class SumLookup extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.data !== this.props.data
  }

  render() {
    const datasets = data => {
      const dataset = {
        label: '% of loss by attribution group',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)'
      }
      dataset['data'] = data
      const datasets = {}
      datasets['datasets'] = [dataset]
      return datasets
    }

    const dataConfig = data => {
      const [xList, yList] = data.length === 2 ? data : [[], []]

      const xLabels = {
        labels: xList.map(
          value => (value !== -1 ? `Group ${value}` : 'Unallocated')
        )
      }

      return Object.assign({}, xLabels, datasets(yList))
    }

    const constChartOptions = {
      maintainAspectRatio: false,
      layout: {
        padding: {
          top: 0,
          right: 0,
          bottom: 40,
          left: 0
        }
      },
      legend: { display: false }
    }

    const noDataChartOptions = {
      scales: {
        yAxes: [
          {
            scaleLabel: { labelString: '%', display: true },
            ticks: { suggestedMin: 0, suggestedMax: 100 }
          }
        ],
        xAxes: [
          {
            scaleLabel: { labelString: 'Attribution Identity', display: true }
          }
        ]
      }
    }

    const withDataChartOptions = {
      scales: {
        yAxes: [
          {
            scaleLabel: { labelString: '%', display: true },
            ticks: { suggestedMin: 0 }
          }
        ],
        xAxes: [
          {
            scaleLabel: { labelString: 'Attribution Identity', display: true }
          }
        ]
      }
    }

    const options = data => {
      if (data.length === 0 || data[0].length === 0) {
        return Object.assign({}, constChartOptions, noDataChartOptions)
      } else {
        return Object.assign({}, constChartOptions, withDataChartOptions)
      }
    }

    return (
      <SizeDiv>
        <HeadingLayout>
          {this.props.heading}
        </HeadingLayout>
        <Bar
          data={dataConfig(this.props.data)}
          options={options(this.props.data)}
          redraw={true}
        />
      </SizeDiv>
    )
  }
}

/**
 * data contains [ array of x values, array of y percentage values ]
 */
SumLookup.propTypes = {
  heading: PropTypes.element.isRequired,
  data: PropTypes.arrayOf(PropTypes.array).isRequired
}

export default SumLookup
