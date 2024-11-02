export function TypographyH1(props: React.HTMLProps<HTMLHeadingElement>) {
  const styles =
    "scroll-m-20 text-4xl font-semibold font-neometric lslg:text-5xl text-primary ";
  return (
    <h1 {...props} className={styles + props.className}>
      {props.children}
    </h1>
  );
}

export function TypographyH2(props: React.HTMLProps<HTMLHeadingElement>) {
  const styles =
    "scroll-m-20 text-3xl font-semibold font-neometric text-primary leading-[3.2rem] ";
  return (
    <h2 {...props} className={styles + props.className}>
      {props.children}
    </h2>
  );
}

export function TypographyH3(props: React.HTMLProps<HTMLHeadingElement>) {
  const styles =
    "scroll-m-20 text-2xl font-normal font-neometric text-primary ";
  return (
    <h3 {...props} className={styles + props.className}>
      {props.children}
    </h3>
  );
}

export function TypographyH4(props: React.HTMLProps<HTMLHeadingElement>) {
  const styles = "scroll-m-20 text-xl font-normal font-neometric text-primary ";
  return (
    <h4 {...props} className={styles + props.className}>
      {props.children}
    </h4>
  );
}

export function TypographyH5(props: React.HTMLProps<HTMLHeadingElement>) {
  const styles = "scroll-m-20 text-lg font-medium font-neometric text-primary ";
  return (
    <h5 {...props} className={styles + props.className}>
      {props.children}
    </h5>
  );
}

export function TypographyP(props: React.HTMLProps<HTMLHeadingElement>) {
  const styles = "[&:not(:first-child)]:mt-2 font-poppins text-primary ";
  return (
    <p {...props} className={styles + props.className}>
      {props.children}
    </p>
  );
}
