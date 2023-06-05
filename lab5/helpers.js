//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.
module.exports = {
    checkId(id) {
      id=id.trim();
      id=parseInt(id);
      if ((!id && id!=0)||typeof id !== 'number'||id <= 0) throw 'Invalid URL Parameter';
      return true;
    },
  };