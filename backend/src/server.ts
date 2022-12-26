import { initTRPC } from "@trpc/server"
import { z } from "zod"

const t = initTRPC.create();

export const enum Carrier {
  USPS = "usps",
  FedEx = "fedex",
  UPS = "ups"
}

export const enum ShippingTypes {
  USPSStandard = "usps_standard",
  USPSPriority = "usps_priority",
  USPSCertified = "usps_certified",
  USPSHold = "usps_hold",
  USPSGlobalExpress = "usps_gloabl_express",
  USPSPriorityExpressInternational = "usps_priority_express_international",
  USPSPriorityExpress = "usps_priority_express",
  USPSPriorityInternational = "usps_priority_international",
  USPSRegistered = "usps_registered",
  USPSSignature = "usps_signature"
}

export type USPSShipment = {
  carrier: Carrier.USPS
  type: ShippingTypes.USPSStandard | ShippingTypes.USPSPriority | ShippingTypes.USPSCertified | ShippingTypes.USPSHold | ShippingTypes.USPSGlobalExpress | ShippingTypes.USPSPriorityExpressInternational | ShippingTypes.USPSPriorityExpress | ShippingTypes.USPSPriorityInternational | ShippingTypes.USPSRegistered | ShippingTypes.USPSSignature
}

export type Shipment = {
  trackingNumber: string;
} & USPSShipment


export const shipments: Shipment[] = [
  {
    trackingNumber: 'asdfb',
    carrier: Carrier.USPS,
    type: ShippingTypes.USPSStandard
  }
]

export const appRouter = t.router({
  packageByTrackingNumber: t.procedure
    .input((val: unknown) => {
      if (typeof val === 'string') return val;
      throw new Error(`Invalid input: ${typeof val}`)
    })
    .query((req) => {
      const { input: trackingNumber } = req;

      const user = shipments.find((p) => p.trackingNumber === trackingNumber)

      return user;
    }),
  packageCreate: t.procedure
    .input(z.string())
    .mutation((req) => {
      const { input: trackingNumber } = req

      const shipment: Shipment = {
        trackingNumber,
        carrier: Carrier.USPS,
        type: ShippingTypes.USPSStandard
      }

      shipments.push(shipment)

      return shipment;
    }),
  allPackages: t.procedure
    .query(() => {
      return shipments
    })
});

export type AppRouter = typeof appRouter;

