export default function Marque1() {
  const items = [
    "City Taxi",
    "Reliable Rides",
    "Easy Booking",
    "On-Time Service",
  ];

  return (
    <div className="marque-section">
      <div className="marquee-wrapper text-slider">
        <div className="marquee-inner to-left">
          <ul className="marqee-list d-flex">
            <li className="marquee-item">
              {items.flatMap((item) => [
                <span key={item} className="text-slider">
                  {item}
                </span>,
                <span key={`${item}-star`} className="text-slider">
                  <img src="/assets/img/star.svg" alt="img" />
                </span>,
              ])}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
