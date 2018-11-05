import React from 'react';
import FooterItem from './item/footerItem';

const FooterContainer = () => (
  <div className="footerContainer">

    <div className="sign-up">
      <div className="container">
        <div className="grid align-center">
          <div className="item size-5">
            <h6>Sign Up for Bay Area Beer News</h6>
          </div>
          <div className="item size-7">

            <form className="">
              <div className="input-group">
                <input
                  className="input-group-field"
                  name="signUp"
                  defaultValue="signup"
                  type="text"
                  aria-label="signup"
                />
                <input
                  className="input-group-button"
                  defaultValue="submit"
                  name="submit"
                  aria-label="submit"
                />
              </div>

            </form>

          </div>
        </div>
      </div>

    </div>


    <footer>
      <nav className="footer-nav">
        <ul className="horizontal">
          <FooterItem
            title="Breweries"
            to="/members"
          />
          <FooterItem
            title="Chapters"
            to="/members"
          />
          <FooterItem
            title="Events"
            to="/members"
          />
        </ul>
      </nav>

      <div className="legal">
        &copy; 2015 BAY AREA BREWERS GUILD
      </div>

    </footer>
  </div>
);


export default FooterContainer;
