import { Block } from "baseui/block";
import { ChevronRight } from "baseui/icon";
import { HeadingXSmall, ParagraphSmall } from "baseui/typography";
import { PageLayout } from "../../components/page-layout/PageLayout";
import { SearchBar } from "../../components/SearchBar";
import { Button } from "baseui/button";
import { useHistory } from "react-router-dom";

export const ReatilerHome = () => {
  const history = useHistory();

  const handleUpcomingOrdersClicked = () => {
    history.push("/retailer/upcoming-orders");
  };

  return (
    <PageLayout backButtonVisible={false} title="Curbside" bottom={() => null}>
      <SearchBar />
      <Block padding="16px 0px">
        <Block display="flex" alignItems="center">
          <Block flex="1">
            <HeadingXSmall margin="0">Store Location</HeadingXSmall>
            <ParagraphSmall margin="0">1936 Dundas St West</ParagraphSmall>
            <ParagraphSmall margin="0">M72 B3H</ParagraphSmall>
          </Block>
          <ChevronRight size={40} />
        </Block>
        <Block
          marginTop="8px"
          height="1px"
          width="100%"
          backgroundColor="lightgrey"
        />
      </Block>
      <Block
        display="flex"
        flexDirection="column"
        alignItems="center"
        padding="16px 32px"
      >
        <Block>
          <img
            src="/icons/order-box.svg"
            alt="upcoming orders"
            height="140px"
          />
        </Block>
        <Block display="flex" marginTop="24px">
          <Button
            endEnhancer={<ChevronRight size={20} />}
            shape="pill"
            size="compact"
            onClick={handleUpcomingOrdersClicked}
          >
            Upcoming Orders
          </Button>
        </Block>
      </Block>
    </PageLayout>
  );
};
