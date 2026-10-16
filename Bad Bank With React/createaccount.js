
function CreateAccount() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');

  return (
    <Card
      bgcolor="primary"
      header="Create Account"
      status={status}
      body={
        show
          ? <CreateForm setShow={setShow} setStatus={setStatus} />
          : <CreateMsg setShow={setShow} />
      }
    />
  );
}

function CreateMsg(props) {
  return (
    <>
      <h5>Account created successfully!</h5>
      <button
        type="button"
        className="btn btn-light"
        onClick={() => props.setShow(true)}
      >
        Add another account
      </button>
    </>
  );
}

function CreateForm(props) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const ctx = React.useContext(UserContext);

  function handle() {
    if (!name.trim() || !email.trim() || !password) {
      props.setStatus('Please fill in all fields.');
      return;
    }

    const existingUser = ctx.users.find(
      user => user.email.toLowerCase() === email.trim().toLowerCase()
    );

    if (existingUser) {
      props.setStatus('An account with this email already exists.');
      return;
    }

    ctx.users.push({
      name: name.trim(),
      email: email.trim(),
      password: password,
      balance: 0
    });

    props.setStatus('');
    props.setShow(false);

    console.log('Account created with initial balance: 0');
  }

  return (
    <>
      Name<br />
      <input
        type="text"
        className="form-control"
        placeholder="Enter name"
        value={name}
        onChange={e => setName(e.currentTarget.value)}
      />
      <br />

      Email address<br />
      <input
        type="email"
        className="form-control"
        placeholder="Enter email"
        value={email}
        onChange={e => setEmail(e.currentTarget.value)}
      />
      <br />

      Password<br />
      <input
        type="password"
        className="form-control"
        placeholder="Enter password"
        value={password}
        onChange={e => setPassword(e.currentTarget.value)}
      />
      <br />

      <button
        type="button"
        className="btn btn-light"
        onClick={handle}
      >
        Create Account
      </button>
    </>
  );
}
