import React from 'react';
  
  //Data from backend goes here
  //Ddata shown here is only dummy; please remove it
  export const evname = [
    'abc',
    'aaa',
    'asdf',
    'qwerty',
    'faq this shit project'
  ];
  export const evstatus = [
    'กำลังจัดกิจกรรม',
    'กำลังจะจัดกิจกรรม',
    'กำลังจะจัดกิจกรรมแล้ว',
    'กำลังจะจัดกิจกรรมแล้วจริง ๆ นะ',
    'เป็นได้แค่เพื่อน'
  ];
  export const evdate = [
    '13/6/2020',
    '13/6/2020',
    '13/6/2020',
    '13/6/2020',
    '13/6/2020'
  ];
  export const evtime = [
    '13.00',
    '13.00',
    '13.00',
    '13.00',
    '13.00'
  ];
  export const lastedit = [
    '10/8/2020',
    '10/8/2020',
    '10/8/2020',
    '10/8/2020',
    '10/8/2020'
  ];

  export const evlocation = [
    'บ้าน',
    'มหาลัยไง',
    'จัดที่ไหนก็ได้โตแล้ว',
    'แยกราชประสงค์',
    'กล้ามากเก่งมาก'
  ]
  export const evtype = [
    'กิจกรรมมหาวิทยาลัย',
    'กิจกรรมมหาวิทยาลัย',
    'กิจกรรมมหาวิทยาลัย',
    'กิจกรรมมหาวิทยาลัย',
    'กิจกรรมมเพื่อประชาชน'
  ]
  export const evview = [
    1, 2, 3, 4, 50
  ]
  export const evinterest = [
    10, 25, 11, 3, 21
  ]

  export const highestView = Math.max(...evview);
  export const highestIntr = Math.max(...evinterest);
  export const lowestView = Math.min(...evview);
  export const lowestIntr = Math.min(...evinterest);
  export let highestViewEv = '';
  export let lowestViewEv = '';
  export let highestIntrEv = '';
  export let lowestIntrEv = '';

  for (let i=0; i<evname.length; i++) {
      if (evview[i] == highestView) {
        highestViewEv = evname[i];
        break;
      }
  }
  for (let i=0; i<evname.length; i++) {
    if (evview[i] == lowestView) {
        lowestViewEv = evname[i];
        break;
    }
  }
  for (let i=0; i<evname.length; i++) {
    if (evinterest[i] == highestIntr) {
      highestIntrEv = evname[i];
      break;
    }
  }
  for (let i=0; i<evname.length; i++) {
    if (evinterest[i] == lowestIntr) {
      lowestIntrEv = evname[i];
      break;
    }
  }