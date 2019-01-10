import 'echarts/lib/component/tooltip';
import PropTypes from 'prop-types';
import _merge from 'lodash.merge';
import EChartsComponentOption from '../EChartsComponentOption';
import XAxis from '../components/XAxis';
import YAxis from '../components/YAxis';

class Tooltip extends EChartsComponentOption {

  static contextTypes = {
    ...EChartsComponentOption.contextTypes,
    chartType: PropTypes.string,
    series: PropTypes.array,
  };

  getOption() {
    const { chartType, series } = this.context;

    const hasAxis = chartType === 'bar' ||
      chartType === 'line' ||
      !!series.find(comp => comp.type === XAxis || comp.type === YAxis);

    return _merge({
      show: true,
      trigger: hasAxis ? 'axis' : 'item',
      axisPointer: {
        type: 'none',
      },
    }, this.props);
  }

  updateChartOption(option) {
    return {
      ...option,
      tooltip: this.getOption(),
    };
  }
}

export default Tooltip;
