import { useSelector } from 'react-redux';


const Notification = () => {
  const notification = useSelector(state => state.notification);
  const notificationText = notification[0];
  const notificationStyle = notification[1];

  if (notification === null) {
    return null;
  }
  return (
    <div id="FromNotification">
      <div className={notificationStyle}> {notificationText} </div>
    </div>
  );
};

export default Notification;
