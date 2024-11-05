import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
const CURRENCY = process.env.NEXT_PUBLIC_CURRENCY;

import { LOAD_TOKEN_ICO } from "../Context/constants";
import { TiTick } from "./ReactICON/index";

const Token = ({ poolDetails }) => {
  const { address } = useAccount();
  const [percentage, setPercentage] = useState();
  const [tokenDetails, setTokenDetails] = useState();

  useEffect(() => {
    if (address) {
      const loadToken = async () => {
        const token = await LOAD_TOKEN_ICO();
        setTokenDetails(token);
      };
      loadToken();
    }
  }, [address]);

  useEffect(() => {
    const calculatePercentage = () => {
      const tokenSold = tokenDetails?.soldTokens ?? 0;
      const tokenTotalSupply =
        tokenDetails?.soldTokens + Number(tokenDetails?.tokenBal) * 1 ?? 1;

      const percentageNew = (tokenSold / tokenTotalSupply) * 100;

      if (tokenTotalSupply === 0) {
        console.error(
          "Token sale balance is zero, cannot calculate percentage."
        );
      } else {
        setPercentage(percentageNew);
      }
    };

    const timer = setTimeout(calculatePercentage, 1000);

    return () => clearTimeout(timer);
  }, [tokenDetails]);

  return (
    <div className="section">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-10 offset-md-1 col-lg-6 offset-lg-3">
            <div className="section__title">
              <h2> Token</h2>
              <p>More features with own Token.</p>
            </div>
          </div>
        </div>
        <div className="row row--relative">
          <div className="col-12">
            <div className="invest invest--big">
              <h2 className="invest__title"> Token</h2>
              <div className="row">
                <div className="col-12 col-lg-5">
                  <div className="invest__rate-wrap">
                    <div className="invest__rate">
                      <span>Total ICO</span>
                      <p>
                        3000{" "}
                        {poolDetails?.depositToken.symbol}
                      </p>
                    </div>
                    <div className="invest__graph">
                      <img src="img/graph/graph2.svg" alt="" />
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-5 offset-lg-1">
                  <div className="invest__rate-wrap">
                    <div className="invest__rate">
                      <span> Total Stake</span>

                      <p className="green">
                        {poolDetails?.depositToken.contractTokenBalance.slice(
                          0,
                          10
                        )}{" "}
                        {poolDetails?.depositToken.symbol}
                      </p>
                    </div>
                    <div className="invest__graph">
                      <img src="img/graph/graph1.svg" alt="" />
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-5">
                  <div className="invest__rate-wrap">
                    <div className="invest__rate">
                      <span>ICO Left:{" "}</span>
                      <p className="red">
                        {tokenDetails?.tokenBal || ""} {tokenDetails?.symbol || ""}
                      </p>
                    </div>
                    <div className="invest__graph">
                      <img src="img/graph/graph3.svg" alt="" />
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-5 offset-lg-1">
                  <div className="invest__rate-wrap">
                    <div className="invest__rate">
                      <span>Stake Rate</span>
                      <p className="green">1 KUZA = 0.00011 tBNB</p>
                    </div>
                    <div className="invest__graph">
                      <img src="img/graph/graph4.svg" alt="" />
                    </div>
                  </div>
                </div>
              </div>
              <p className="invest__info">
                KUZA is token test in BNB testnet
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Token;
