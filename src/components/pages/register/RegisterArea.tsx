import Link from "next/link";

const RegisterArea = () => {
  return (
    <div className="tg-login-area pt-130 pb-130">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-6 col-lg-8 col-md-10">
            <div className="tg-login-wrapper">
              <div className="tg-login-top text-center mb-30">
                <h2>Account access</h2>
                <p>
                  Public registration is disabled. Accounts are created by a{" "}
                  <strong>super admin</strong>. If this is a new installation with no users, use
                  first-time setup.
                </p>
              </div>
              <div className="tg-login-form text-center">
                <Link href="/login" className="tg-btn mb-15 d-inline-block">
                  Log in
                </Link>
                <p className="mb-0">
                  <Link href="/setup">First-time setup (empty database only)</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterArea;
