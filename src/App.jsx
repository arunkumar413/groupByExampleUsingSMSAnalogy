import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [selectedGroup, setSelectedGroup] = useState(false);
  const [selectedKey, setSelectedKey] = useState('');

  function handleClick(evt, key) {
    setSelectedGroup(true);
    setSelectedKey(key);
  }

  // Sample array of SMS objects
  const smsArray = [
    {
      sender: '1234567890',
      Name: 'Arun',
      date: new Date('2024-02-07T10:30:00'),
      message: 'Hello',
    },
    {
      sender: '9876543210',
      name: 'Tom',
      date: new Date('2024-02-07T09:45:00'),
      message: 'Hi there',
    },
    {
      sender: '1234567890',
      name: 'Arun',
      date: new Date('2024-02-07T11:15:00'),
      message: 'How are you?',
    },
    // Add more SMS objects as needed
  ];

  // Group SMS by sender
  const groupedSms = smsArray.reduce((groups, sms) => {
    const key = sms.sender;
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(sms);
    return groups;
  }, {});

  // Sort each group by date in descending order (most recent first)
  for (const key in groupedSms) {
    groupedSms[key].sort((a, b) => b.date - a.date);
  }

  // Now, groupedSms contains the SMS grouped by sender and sorted by date
  console.log(groupedSms);

  let keys = Object.keys(groupedSms);

  let keyElements = Object.keys(groupedSms).map(function (key) {
    return (
      <div onClick={(evt) => handleClick(evt, key)} className="group">
        {' '}
        {key} {groupedSms[key][0].name}{' '}
      </div>
    );
  });

  let elements =
    selectedKey !== '' &&
    groupedSms[selectedKey].map(function (item, index) {
      return (
        <div className="smsGroup">
          <div className="message">{item.message}</div>
        </div>
      );
    });

  return (
    <>
      <div>
        {!selectedGroup && keyElements}{' '}
        {selectedGroup && selectedKey !== '' && elements}{' '}
      </div>
    </>
  );
}

export default App;
