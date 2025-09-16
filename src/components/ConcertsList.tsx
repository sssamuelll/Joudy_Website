import React from 'react';


interface Concert {
  date: string;
  city: string;
  venue: string;
  ticketUrl: string;
}

interface SectionAProps {
  concerts: Concert[];
}

const ConcertsList: React.FC<SectionAProps> = ({ concerts }) => {
  return (
    <div className="concert-list-section">
      <ul className="concert-list">
        {concerts.map((concert, index) => (
          <li key={index} className="concerts-list-item">
            <span className="concerts-list-date">{concert.date}</span>
            <div className="concerts-list-infos">
              <div className="list-city-container">
                <span className="concerts-list-city">{concert.city}</span>
              </div>
              <div className="list-venue-container">
                <span className="concerts-list-venue">{concert.venue}</span>
              </div>
              <div className="button-tickets-container">
                <button
                  type="button"
                  className="concert_button"
                  onClick={() => window.open(concert.ticketUrl, "_blank")}
                >
                  <span>Tickets</span>
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConcertsList;
