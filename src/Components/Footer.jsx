const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h4>Contact Us</h4>
        <p>
          Email:{" "}
          <a href="mailto:support@yourbloodbankapp.com">
            support@yourbloodbankapp.com
          </a>
        </p>
        <p>Phone: (+91) 7092xxx649</p>
        <p>Address: 123 Blood Drive Lane, Coimbatore, Tamilnadu</p>
      </div>

      <div className="footer-join">
        <p className="footer-join-text">
          Join the Cause: Help save lives! Consider becoming a donor or
          volunteering with us.
        </p>
        <p className="footer-join-text1">
          &copy; {new Date().getFullYear()} Your Blood Bank Application. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
