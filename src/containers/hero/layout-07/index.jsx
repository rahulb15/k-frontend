import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import Image from "next/image";
import dynamic from 'next/dynamic';
import ClientAvatar from "@ui/client-avatar";
import Anchor from "@ui/anchor";
import { ImageType } from "@utils/types";
import TVChartAdvanceContainer from '@components/TVChartAdvanceContainer';

const TVChartContainer = dynamic(
  () => import("@components/TVChartAdvanceContainer").then((mod) => mod.TVChartContainer),
  { ssr: false }
);

const defaultWidgetProps = {
  symbol: "AAPL",
  interval: "1D",
  library_path: "/static/charting_library/",
  locale: "en",
  charts_storage_url: "https://saveload.tradingview.com",
  charts_storage_api_version: "1.1",
  client_id: "tradingview.com",
  user_id: "public_user_id",
  fullscreen: false,
  autosize: true,
};

const HeroArea = ({ data }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="rn-banner-area">
      {/* <div className="slider-style-7" data-black-overlay="8"> */}
      {isClient && <TVChartAdvanceContainer {...defaultWidgetProps} />}
      {/* </div> */}
    </div>
  );
};

HeroArea.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: ImageType.isRequired,
    authors: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired,
        image: ImageType.isRequired,
      })
    ),
    bitCount: PropTypes.number,
  }),
};

export default HeroArea;