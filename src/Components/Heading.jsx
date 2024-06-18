function Heading(props) {
  return (
    <h1 className="text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
      {props.children}
    </h1>
  );
}

export default Heading;
