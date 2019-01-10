import PropTypes from 'prop-types';
import _merge from 'lodash.merge';
import EChartsComponentOption from '../EChartsComponentOption';
import { transformTextOption } from '../utils';
import Bars from '../series/Bars';

class XAxis extends EChartsComponentOption {
  static displayName = 'XAxis';

  static defaultProps = {
    show: true,
    type: 'category',
    data: [],
  };

  static contextTypes = {
    ...EChartsComponentOption.contextTypes,
    chartType: PropTypes.string,
    horizontal: PropTypes.bool,
    series: PropTypes.array
  };

  getOption(option) {
    const {
      axisLabel,
      ...props
    } = this.props;
    const { chartType, horizontal, series } = this.context;

    return _merge({
      boundaryGap: !!series.find(comp => comp.type === Bars),
      axisLine: {
        lineStyle: {
          color: '#e5e5ea',
        },
      },
      axisTick: {
        show: false,
      },
      axisLabel: transformTextOption(axisLabel, {
        show: true,
        textStyle: {
          color: '#8e8e93',
        },
      }),
      splitLine: {
        show: false,
      },
    }, props);
  }

  updateChartOption(option) {
    const xAxisOption = this.getOption();

    return {
      ...option,
      xAxis: option.xAxis ?
        (
          Array.isArray(option.xAxis) ?
            [...option.xAxis, xAxisOption] :
            [option.xAxis, xAxisOption]
        ) :
        xAxisOption,
    }
  }
}

export default XAxis;
