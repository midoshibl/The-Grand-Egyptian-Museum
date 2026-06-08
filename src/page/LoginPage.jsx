import Login from "../components/StartPg/Login";
import logo from "../assets/images/mask2.png";
function LoginPage() {
  return (
    <>
    <section className="start  font-cairo h-screen max-xl:bg-center md:bg-tran">
      <div
        dir="rtl"
        className="flex justify-between gap-4 h-screen overflow-hidden overflow-y-hidden"
      >
        <div className="relative hidden lg:block lg:max-w-full max-w-[50%]  w-fit top-6 -right-9 ">
          <img
            className="md:w-[520px] md:max-w-full max-w-[50%] "
            src={logo}
            alt="logo"
          />
        </div>

        <Login/>
      </div>
    </section>
    </>
  );
}

export default LoginPage;
