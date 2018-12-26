//配置:
//
// <NewDateRange
//   dateProps={{
//     startDate: this.state.startDate,
//     startTime: this.state.startTime,
//     endDate: this.state.endDate,
//     endTime: this.state.endTime
//   }}
//   changeStartDate={ (startDate)=>{ this.setState({ startDate }) } }
//   changeStartTime={ (startTime)=>{ this.setState({ startTime }) } }
//   changeEndDate={ (endDate)=>{ this.setState({ endDate }) } }
//   changeEndTime={ (endTime)=>{ this.setState({ endTime }) } }
//   allowClear={ true }
//   />

//调用接口时候传递配置
//高级搜索时间配置
// let disabled  = false
// if( !this.state.startDate ) {
//   disabled = true
// }
// if( !this.state.startTime ) {
//   disabled = true
// }
// if( !this.state.endDate ) {
//   disabled = true
// }
// if( !this.state.endTime ) {
//   disabled = true
// }
// if( disabled ) {
//   message.warning('请补全搜索时间')
//   return
// }
// const startTimeString = this.state.startDate.format("YYYY-MM-DD") + ' ' + this.state.startTime.format('HH:mm:ss')
// const endTimeString = this.state.endDate.format("YYYY-MM-DD") + ' ' + this.state.endTime.format('HH:mm:ss')
// params.startTime = moment(startTimeString).valueOf()
// params.endTime = moment(endTimeString).valueOf()
// if( params.endTime - params.startTime > 3 * 31 * 24 * 3600 * 1000 ) {
//   message.warning('搜索时间范围不得大于3个月')
//   return
// }
// if( params.endTime - params.startTime < 0 ) {
//   message.warning('起始时间不得晚于截止时间')
//   return
// }


//初始化时间配置
// constructor(props) {
//   const defaultTime = new Date().getTime()
//   const startTime = moment.unix(defaultTime / 1000).hour(0).minute(0).second(0).millisecond(0)
//   const endTime = moment.unix(defaultTime / 1000).hour(23).minute(59).second(59).millisecond(999)
//   super(props)
//   this.state = {
//     startDate: startTime,
//     startTime: startTime,
//     endDate: endTime,
//     endTime: endTime,
//   }
// }



import React, { Component } from 'react'
import { TimePicker, DatePicker, Button } from 'antd'
import moment from 'moment'

class NewDateRange extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }


  componentDidMount() {
    //console.log(this.props)
  }

  //打印测试
  handleLog() {
    const dateProps = this.props.dateProps
    let disabled  = false
    if( !dateProps.startDate ) {
      disabled = true
    }
    if( !dateProps.startTime ) {
      disabled = true
    }
    if( !dateProps.endDate ) {
      disabled = true
    }
    if( !dateProps.endTime ) {
      disabled = true
    }
    if( disabled ) {
      console.log('有时间未填写')
      return
    }
    const start = dateProps.startDate.format('YYYY-MM-DD') + ' ' +  dateProps.startTime.format('HH:mm:ss')
    const end = dateProps.endDate.format('YYYY-MM-DD') + ' ' +  dateProps.endTime.format('HH:mm:ss')
    console.log("开始时间:", start)
    console.log("截止时间:", end)
    console.log(this.props)
  }

  //确定时间
  pickDate1() {
    const dateProps = this.props.dateProps
    if(!dateProps.startTime) {
      this.props.changeStartTime(moment('00:00:00', 'HH:mm:ss'))
    }
    this.setState({ open1: false })
  }

  //确定时间
  pickDate2() {
    const dateProps = this.props.dateProps
    if(!dateProps.endTime) {
      this.props.changeEndTime(moment('00:00:00', 'HH:mm:ss'))
    }
    this.setState({ open2: false })
  }

  render() {
    const dateProps = this.props.dateProps || {}
    const disabledStartDate = this.props.disabledStartDate ? this.props.disabledStartDate : ()=>{}
    const disabledEndDate = this.props.disabledEndDate ? this.props.disabledEndDate : ()=>{}
    const type = this.props.type // date
    return (
      <span>
         <DatePicker
           style={{ width: 130, marginRight: 3 }}
           value={ dateProps.startDate }
           onChange={ (time)=>{ this.props.changeStartDate(time) } }
           disabledDate={ disabledStartDate }
           allowClear={ this.props.allowClear || true }
          />
        <span hidden={ type === 'date' ? (true) : false }>
          <TimePicker
            value={ dateProps.startTime }
            open={this.state.open1 || false}
            defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}
            onOpenChange={ (open1)=>{ this.setState({ open1 }) } }
            allowEmpty={ this.props.allowClear }
            onChange={ (time, timeString)=>{
              this.props.changeStartTime(time)
             } }
            addon={() => (
             <div style={{ textAlign:'right'}}>
               <Button size="small" type="primary" onClick={ this.pickDate1.bind(this) }>
                 确定
               </Button>
             </div>
           )}/>
        </span>
        <span style={{ margin: '0px 10px'}} onClick={ this.handleLog.bind(this) }>至</span>
         <DatePicker
           style={{ width: 130, marginRight: 3 }}
           value={ dateProps.endDate }
           disabledDate={disabledEndDate}
           allowClear={ this.props.allowClear }
           onChange={ (time)=>{ this.props.changeEndDate(time) } }
          />
        <span hidden={ type === 'date' ? (true) : false }>
          <TimePicker
            value={ dateProps.endTime }
            open={this.state.open2 || false}
            defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}
            onOpenChange={ (open2)=>{ this.setState({ open2 }) } }
            allowEmpty={ this.props.allowClear }
            onChange={ (time, timeString)=>{
              this.props.changeEndTime(time)
             } }
            addon={() => (
             <div style={{ textAlign:'right'}}>
               <Button size="small" type="primary" onClick={ this.pickDate2.bind(this) }>
                 确定
               </Button>
             </div>
           )}/>
        </span>
      </span>
    )
  }
}

export default NewDateRange
