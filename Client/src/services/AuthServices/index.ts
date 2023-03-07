import ethers from "ethers";

export const AuthServices = {
  connect: async (provider: ethers.providers.Web3Provider) => {
    try {
      const [wallet] = await provider.send("eth_requestAccounts", []);
      return wallet;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  getConnectedWallet: async (provider: ethers.providers.Web3Provider) => {
    try {
      const accounts = await provider.listAccounts();
      if (accounts.length > 0) {
        return accounts[0];
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
};
