"use client";
import { useState } from "react";
export default function Accordion1() {
  const [activeItem, setActiveItem] = useState(1);

  const handleClick = (index) => {
    setActiveItem(index);
  };
  return (
    <>
      <div className="accordion" id="accordion">
        <div className="accordion-item mb-3 wow fadeInUp" data-wow-delay=".3s">
          <h5 className="accordion-header" onClick={() => handleClick(1)}>
            <button
              className={
                activeItem == 1
                  ? "accordion-button"
                  : "accordion-button collapsed"
              }
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#faq1"
              aria-expanded="true"
              aria-controls="faq1"
            >
              How do I register with City Taxi as a passenger or driver?
            </button>
          </h5>
          <div
            id="faq1"
            className={
              activeItem == 1
                ? "accordion-collapse collapse show"
                : "accordion-collapse collapse"
            }
            data-bs-parent="#accordion"
          >
            <div className="accordion-body">
              Passengers and drivers can easily register with our online system.
              Once registered, you will receive an email containing your
              username and password, allowing you to access and start using our
              services right away.
            </div>
          </div>
        </div>
        <div className="accordion-item mb-3 wow fadeInUp" data-wow-delay=".5s">
          <h5 className="accordion-header" onClick={() => handleClick(2)}>
            <button
              className={
                activeItem == 2
                  ? "accordion-button"
                  : "accordion-button collapsed"
              }
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#faq2"
              aria-expanded="false"
              aria-controls="faq2"
            >
              How do passengers reserve a taxi and receive driver details?
            </button>
          </h5>
          <div
            id="faq2"
            className={
              activeItem == 2
                ? "accordion-collapse collapse show"
                : "accordion-collapse collapse"
            }
            data-bs-parent="#accordion"
          >
            <div className="accordion-body">
              Passengers can reserve taxis via our website. After the
              reservation is confirmed, an SMS is sent with the driver’s name,
              vehicle details, and contact information, ensuring a smooth pickup
              experience.
            </div>
          </div>
        </div>
        <div className="accordion-item mb-3 wow fadeInUp" data-wow-delay=".7s">
          <h5 className="accordion-header" onClick={() => handleClick(3)}>
            <button
              className={
                activeItem == 3
                  ? "accordion-button"
                  : "accordion-button collapsed"
              }
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#faq3"
              aria-expanded="false"
              aria-controls="faq3"
            >
              How does City Taxi handle unregistered passengers?
            </button>
          </h5>
          <div
            id="faq3"
            className={
              activeItem == 3
                ? "accordion-collapse collapse show"
                : "accordion-collapse collapse"
            }
            data-bs-parent="#accordion"
          >
            <div className="accordion-body">
              Unregistered passengers can book a taxi through our telephone
              operator service. Upon booking, an SMS confirmation is sent with
              the driver’s details, while the system records the passenger’s
              contact information securely.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
