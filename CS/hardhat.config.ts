import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    arbitrum: {
      url: "https://arb-goerli.g.alchemy.com/v2/E4VcLohsWAkBjxxPapK278zKQLXzlQ1W",
      accounts: ["fe5deb2e55e9f9a342a9fec9deaa8b4b764cc3e901c656011b41dfe3ce14e249"], // 개인 키 배열로 대체
      gas: 2100000, // Gas 리미트
      gasPrice: 100000000, // Gas 가격 maxFeePerGas
      timeout: 1800000 // 타임아웃 설정
    }
  }
};

export default config;
