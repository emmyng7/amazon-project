import PromoSectionCard from "./PromoSectionCard";
import { useTranslation } from "react-i18next";

function PromoSection({ products }) {
  const { t } = useTranslation();

  if (!products.length) return null;

  const cards = [
    {
      title: t("promo.gamingAccessories"),
      products: products.slice(20, 24),
      link: t("buttons.shopNow"),
    },
    {
      title: t("home.refreshSpace"),
      products: products.slice(24, 28),
      link: t("buttons.seeMore"),
    },
    {
      title: t("promo.fashionDeals"),
      products: products.slice(28, 32),
      link: t("buttons.discoverMore"),
    },
    {
      title: t("home.newArrivals"),
      products: products.slice(32, 36),
      link: t("buttons.exploreAll"),
    },
  ];

  return (
    <section className="max-w-[1500px] mx-auto mt-8 px-4 transition-colors duration-300">

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {cards.map((card, index) => (
          <PromoSectionCard
            key={index}
            title={card.title}
            products={card.products}
            link={card.link}
          />
        ))}

      </div>

    </section>
  );
}

export default PromoSection;