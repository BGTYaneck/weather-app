import React from "react";

type Props = {
  city: string;
};

const Fav = (props: Props) => {
  return (
    <div>
      <p>{props.city.toString()}</p>
    </div>
  );
};

export default Fav;
