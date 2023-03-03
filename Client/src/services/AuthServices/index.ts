export const AuthServices = {
  connectWallet: async () => {
    if (!window.ethereum) {
      alert("Please install Metamask");
      return;
    }
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = accounts[0];
      if (!account) throw new Error("No account found");
      return account;
    } catch (error) {
      console.log(error);
    }
  },
  getConnectedWallet: async () => {
    if (!window.ethereum) {
      alert("Please install Metamask");
      return;
    }
    try {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      const account = accounts[0];
      if (!account) throw new Error("No account found");
      return account;
    } catch (error) {
      console.log(error);
    }
  },
};
