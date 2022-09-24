import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector( state => state.notification );
  console.log("🚀 ~ file: Notification.js ~ line 5 ~ Notification ~ notification", notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if(notification === ''){
    return (
      <></>
    )
  }
  else return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification;