import { useTranslation } from "react-i18next";
import PromoCard from "./PromoCard";

function PromoGrid({ products }) {
  const { t } = useTranslation();

  if (!products.length) return null;

  const cards = [
    {
      title: t("promo.gamingAccessories"),
      products: products.slice(0, 4),
      link: t("promo.shopGaming"),
    },
    {
      title: t("promo.fashionDeals"),
      products: products.slice(4, 8),
      link: t("promo.seeAllDeals"),
    },
    {
      title: t("promo.homeEssentials"),
      products: products.slice(8, 12),
      link: t("promo.discoverMore"),
    },
    {
      title: t("promo.beautyPicks"),
      products: products.slice(12, 16),
      link: t("promo.exploreNow"),
    },
  ];

  return (
    <section className="relative -mt-20 sm:-mt-24 md:-mt-32 lg:-mt-40 xl:-mt-48 z-20 px-4 transition-colors duration-300">

      <div className="max-w-[1500px] mx-auto">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {cards.map((card, index) => (
            <PromoCard
              key={index}
              title={card.title}
              products={card.products}
              link={card.link}
            />
          ))}

        </div>

      </div>

    </section>
  );
}

export default PromoGrid;