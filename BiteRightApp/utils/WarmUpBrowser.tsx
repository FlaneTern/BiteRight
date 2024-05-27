import React, { useEffect } from "react";
import * as WebBrowser from "expo-web-browser";

const WarmUpBrowser = () => {
  useEffect(() => {
    WebBrowser.warmUpAsync();

    return () => {
      WebBrowser.coolDownAsync();
    };
  }, []);
};

export default WarmUpBrowser;
