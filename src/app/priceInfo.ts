/**
 * Created by sudip_000 on 3/18/2017.
 */


export class PriceInfo{
    constructor(public PriceId: number,
                public ResponseId: number,
                public ServiceType: string,
                public Value: number,
                public PriceValue: number,
                public VariableCost: number,
                public PriceWithTax: number,
                public Uom: number,
                public Term: string,
                public GreenPercentage: number,
                public GreenType: string,
                public PriceDate: Date,
                public PriceExpirationDate: Date,
                public PricingTypeId : number,
                public ProductCodeId: number,
                public PriceWithMargin: number,
                public ProductName: string,
                public ContractGuid: string,
                public EMTPriceId: number,
                public BrokerRestriction: boolean,
                public CreditRestriction: boolean){
    }
  
    static getSamplePrice() : PriceInfo {
      return new PriceInfo(1, 2, "Electric", 0.45, 0.45,
                           0, 0, 1, "6", 0,
                           "", new Date(), new Date(), 1, 1,
                           0, "New Price", "", 1,
                           false, false);
    }
  }
  