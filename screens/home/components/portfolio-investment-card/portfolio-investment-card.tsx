import { Card, ListItem } from "@/common/components";
import { formatPercentValue, formatValue } from "@/common/utils";
import { PortfolioInvestmentCardPropsType } from "./portfolio-investment-card.types";
import { ListItemVariants } from "@/types/components";

function PortfolioInvestmentCard({
  overall,
  currency,
  onInfoPress,
}: PortfolioInvestmentCardPropsType) {
  return (
    <Card>
      <Card.Title title="Portfolio" onPress={onInfoPress} />
      <ListItem
        leftText="Invested"
        rightText={`${formatValue(overall.boughtValue, currency)}`}
      />
      <ListItem
        leftText="Market value"
        rightText={`${formatValue(overall.marketValue, currency)}`}
      />
      <ListItem
        variant={
          overall.profitOrLoss > 0
            ? ListItemVariants.PROFIT
            : ListItemVariants.LOSS
        }
        leftText="Profit/Loss"
        rightText={`${formatValue(
          overall.profitOrLoss,
          currency
        )} (${formatPercentValue(overall.profitOrLossPercentage)})`}
      />
    </Card>
  );
}

export default PortfolioInvestmentCard;
