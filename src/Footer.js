import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <>
      <footer>
        <div className="container">
          <ul>
            <li>
              <a className="footer-link" href="https://github.com" target="_blank" rel="noopener noreferrer">Github</a>
            </li>
            <li>
              <a className="footer-link" href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
            </li>
            <li>
              <a className="footer-link" href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
            </li>
          </ul>
          <small>Abdulrahman Maher © 2020</small>
        </div>
      </footer>
    </>
  );
}

export default Footer;