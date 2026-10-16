
function Balance() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');

  return (
    <Card
      bgcolor="info"
      header="Balance"
      status={status}
      body={
        show
          ? <BalanceForm setShow={setShow} setStatus={setStatus} />
          : <BalanceMsg setShow={setShow} />
      }
    />
  );
}

function BalanceMsg(props) {
  return (
    <>
      <h5>Balance checked successfully.</h5>
      <button
        type="button"
        className="btn btn-light"
        onClick={() => props.setShow(true)}
      >
        Check balance again
      </button>
    </>
  );
}

function BalanceForm(props) {
  const [email, setEmail] = React.useState('');
  const ctx = React.useContext(UserContext);

  function handle() {
    const user = ctx.users.find(
      user => user.email.toLowerCase() === email.trim().toLowerCase()
    );

    if (!user) {
      props.setStatus('Account not found. Please check your email.');
      return;
    }

    // Treat missing or invalid balances as zero.
    const numericBalance = Number(user.balance ?? 0);
    const safeBalance = Number.isFinite(numericBalance)
      ? numericBalance
      : 0;

    props.setStatus('Your balance is: ' + safeBalance);
    props.setShow(false);
  }

  return (
    <>
      Email<br />
      <input
        type="email"
        className="form-control"
        placeholder="Enter your registered email"
        value={email}
        onChange={e => setEmail(e.currentTarget.value)}
      />
      <br />

      <button
        type="button"
        className="btn btn-light"
        onClick={handle}
      >
        Check Balance
      </button>
    </>
  );
}
