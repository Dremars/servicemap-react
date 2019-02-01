

export const keyboardHandler = (callback: any, keys: any) => {
  let codes: any, handle: any;
  codes = keys.map((key:any) => {
    switch (key) {
      case 'enter':
        return 13;
      case 'space':
        return 32;
      case 'esc':
        return 27;
    }
  });
  handle = callback;
  return (event: any) => {
    var ref;
    event.stopPropagation();
    if (ref = event.which, codes.indexOf(ref) >= 0) {
      return handle(event);
    }
  };
}