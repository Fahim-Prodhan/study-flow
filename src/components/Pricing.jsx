import SectionHeader from "./shared/SectionHeader";
import PricingCard from "./shared/PricingCard";

const Pricing = () => {
  const plans = [
    {
      id: 1,
      pricingType: "Free",
      description: "Basic plan for individuals",
      price: 500,
      expiration: "Forever",
      features: [
        "Access to basic features",
        "Limited storage space",
        "Community support",
        "Basic analytics and reporting",
        "Limited customization options",
      ],
    },
    {
      id: 2,
      pricingType: "Pro",
      description: "Advanced plan for professionals",
      price: 1000,
      expiration: "Monthly",
      features: [
        "Access to all features",
        "Unlimited storage space",
        "Priority support",
        "Advanced analytics and reporting",
        "Customizable branding options",
      ],
    },
  ];

  return (
    <div className="container mx-auto py-12 space-y-8">
      <SectionHeader
        title={"Pricing"}
        subTitle={"Start free. Upgrade if you outgrow it."}
      />

      <div className="grid grid-cols-2 gap-4 max-w-[700px] mx-auto">
        {plans.map((plan) => {
          console.log(plan.pricingType);
          return <PricingCard key={plan.id} plan={plan} />;
        })}
      </div>
    </div>
  );
};

export default Pricing;
