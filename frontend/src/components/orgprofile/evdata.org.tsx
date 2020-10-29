import React from 'react';
  
  //Data from backend goes here
  //Ddata shown here is only dummy; please remove it
  export const event_name = [
    'abc',
    'aaa',
    'asdf',
  ];
  export const status = [
    'กำลังจัดกิจกรรม',
    'กำลังจะจัดกิจกรรม',
    'กำลังจะจัดกิจกรรมแล้ว',
  ];
  export const event_start_date = [
    '13/6/2020',
    '13/6/2020',
    '13/6/2020',
  ];
  export const event_start_time = [
    '13.00',
    '13.00',
    '13.00',
  ];
  export const updated_at = [
    '10/8/2020',
    '10/8/2020',
    '10/8/2020',
  ];

  export const place = [
    'บ้าน',
    'มหาลัยไง',
    'จัดที่ไหนก็ได้โตแล้ว',
    'แยกราชประสงค์',
    'กล้ามากเก่งมาก'
  ]
  export const event_type = [
    'กิจกรรมมหาวิทยาลัย',
    'กิจกรรมมหาวิทยาลัย',
    'กิจกรรมมหาวิทยาลัย',
    'กิจกรรมมหาวิทยาลัย',
    'กิจกรรมมเพื่อประชาชน'
  ]
  export const view_counts = [
      1, 2, 3, 4, 50
  ]
  export const interest_count = [
      10, 25, 11, 48, 2
  ]
  

  export const highestView = Math.max(...view_counts);
  export const highestIntr = Math.max(...interest_count);
  export const lowestView = Math.min(...view_counts);
  export const lowestIntr = Math.min(...interest_count);
  export let highestViewEv = '';
  export let lowestViewEv = '';
  export let highestIntrEv = '';
  export let lowestIntrEv = '';

  for (let i=0; i<event_name.length; i++) {
      if (view_counts[i] == highestView) {
        highestViewEv = event_name[i];
        break;
      }
  }
  for (let i=0; i<event_name.length; i++) {
    if (view_counts[i] == lowestView) {
        lowestViewEv = event_name[i];
        break;
    }
  }
  for (let i=0; i<event_name.length; i++) {
    if (interest_count[i] == highestIntr) {
      highestIntrEv = event_name[i];
      break;
    }
  }
  for (let i=0; i<event_name.length; i++) {
    if (interest_count[i] == lowestIntr) {
      lowestIntrEv = event_name[i];
      break;
    }
  }