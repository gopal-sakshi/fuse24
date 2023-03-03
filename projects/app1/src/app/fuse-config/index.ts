export const fuseConfig: any = {
    // Color themes can be defined in src/app/app.theme.scss
    colorTheme: "theme-default",
    customScrollbars: true,
    layout: {
      style: "vertical-layout-1",
      width: "fullwidth",
      navbar: {
        primaryBackground: "fuse-navy-700",
        secondaryBackground: "fuse-navy-900",
        folded: false,
        hidden: false,
        position: "left",
        variant: "vertical-style-2",
      },
      toolbar: {
        customBackgroundColor: true,
        background: "fuse-white-500",
        hidden: false,
        position: "below-fixed",
      },
      footer: {
        customBackgroundColor: true,
        background: "fuse-navy-900",
        hidden: false,
        position: "below-fixed",
      },
      sidepanel: {
        hidden: false,
        position: "right",
      },
    },
  };