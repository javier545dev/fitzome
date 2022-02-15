import React from 'react';

//import Bars from '../components/Bars';
import Carousel from '../components/carousel';

// const MemoizedBars= React.memo(({ width, sets, current, currentWorkout }) => (
//       <Bars width={width} sets={sets} current={current} currentWorkout={currentWorkout}/>
// ));

const MemoizedCarousel = React.memo(({ label, user_info, items,  }) => (
    <Carousel  label={label} user_info={user_info} items={items} /> 
));

export {
  //MemoizedBars,
  MemoizedCarousel,
}