import React from 'react'

interface StopProps {
  stop: any
}

class TransitStopTimes extends React.Component<StopProps> {
  constructor(props: any) {
    super(props)
  }

  getInfo () {
    const {stop} = this.props
    
    return stop.name
  }


  //@ts-ignore
  render() {
    const data = this.getInfo()
    return(
      <div>
        {data}
      </div>
    )
  }
}
export default TransitStopTimes