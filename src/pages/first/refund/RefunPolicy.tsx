import React from 'react'
import Navbar from '../../../components/Navbars/Navbar'
import Footer from '../../../components/footer/Footer'

const RefunPolicy = () => {
  return (
    <div>
        <Navbar />

        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-6">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
          <h1 className="text-3xl font-bold mb-6 text-center">Refund Policy</h1>
          <div className="space-y-4 text-gray-700">
            <p className="text-2xl  mb-6 text-center">
              RETURNS AND REFUNDS POLICY
            </p>
            <h2 className="text-2xl font-semibold">1. Introduction</h2>
            <p>
              At mmart, we want you to have a positive experience every time you
              shop with us. Occasionally though, we know you may want to return
              items you have purchased.This Returns/ Refunds Policy sets out our
              conditions for accepting returns and issuing refunds for items
              purchased on mmart. .It also sets out when we will not accept
              returns or issue refunds.
            </p>
            <h2 className="text-2xl font-semibold">
              2. Return period and conditions for acceptance of returns
            </h2>
            <p>
              Subject to the rules set out in this Returns; Refunds Policy, we
              offer returns for most items within 24 hrs post delivery. We do
              not accept returns, for any reason whatsoever, after the returns
              period has lapsed..You may return items purchased on mmart within
              the returns period, for the reasons listed below.
            </p>

            <table className="w-full text-sm text-left text-gray-500 border-[2px] border-[#0071BC] rounded-2xl">
              <thead className="text-xs bg-[#0071BC] text-white  uppercase  ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Reason for return
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Applicable product category
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className=" border-b">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 md:whitespace-nowrap"
                  >
                    Item received broken or defective
                  </th>
                  <td className="px-6 py-4">All product categories</td>
                </tr>

                <tr className=" border-b">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 md:whitespace-nowrap"
                  >
                    Item received broken or defective
                  </th>
                  <td className="px-6 py-4">All product categories</td>
                </tr>

                <tr className=" border-b">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 md:whitespace-nowrap"
                  >
                    Packaging was damaged
                  </th>
                  <td className="px-6 py-4">All product categories</td>
                </tr>

                <tr className=" border-b">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 md:whitespace-nowrap"
                  >
                    Item received used or expired
                  </th>
                  <td className="px-6 py-4">All product categories</td>
                </tr>

                <tr className=" border-b">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 md:whitespace-nowrap"
                  >
                    Item seems to be fake/unauthentic
                  </th>
                  <td className="px-6 py-4">All product categories</td>
                </tr>

                <tr className=" border-b">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 md:whitespace-nowrap"
                  >
                    Wrong item/colour / size/model
                  </th>
                  <td className="px-6 py-4">All product categories</td>
                </tr>
              </tbody>
            </table>

            <p>
              We shall only accept returns of items that are unopened and in the
              same condition you received them, with their original packaging
              and seal intact where applicable, unless the item became defective
              after delivery became damaged or defective after reasonable use
              (in accordance with manufacturers guidelines where applicable)
              during the returns period.
            </p>

            <h2 className="text-2xl font-semibold">
              3. Items that cannot be returned
            </h2>
            <p>
              We do not accept returns of certain product categories for health
              and hygiene reasons Customer safety is important to us, so certain
              product categories cannot be returned due to health and hygiene
              reasons, or if they may deteriorate or expire rapidly. You shall
              only be entitled to return in respect of these items if you
              received the wrong item; a damaged or defective item; or a fake or
              inauthentic item. You are not entitled to a refund or return of
              these product categories if you have changed your mind.
            </p>

            <h2 className="text-2xl font-semibold">4. Packaging returns</h2>
            <p>
              When returning an item for any reason, you must do so in the exact
              condition you received it from mmart, with its original packaging
              and all tags and labels attached (e.g. shoes should be returned
              within the original shoe box; and seals on items including audio).
              Returned items are your responsibility until they reach us, so do
              make sure they are packaged properly and can't get damaged on the
              way.
              <br />
              <br />
              You must not include in the packaging with the returned item any
              item not pertaining to the returned item as originally received
              from mmart. MMart will not be responsible for any items
              erroneously contained within a returned package, or for any data
              breach resulting from failure to eliminate personal data contained
              in a returned item.
            </p>

            <h2 className="text-2xl font-semibold">5. Refunds</h2>
            <p>
              If we accept your return, or if you order but do not receive an
              item, we aim to refund you the purchase price of the item within
              the period of time stated on a week.
              <br />
              <br />
              For incorrect, defective, or damaged items, you will also be
              refunded for the full cost of delivery of the returned items, once
              your return is processed.
              <br />
              <br />
              If the return is not the result of mmart error or seller error
              (i.e. you changed your mind or the size does not fit as expected)
              you will not receive any refund on delivery fees. The refund
              request form shall state which payment method(s) for receipt of
              refunds are available to you.
            </p>

            <h2 className="text-2xl font-semibold">
              6. Rejected return and refund requests and forfeiture
            </h2>
            <p>
              All items are inspected on return to verify the return reasons
              provided. If your return request is not approved by mmart, you
              shall not receive any refund of the purchase price or the delivery
              fees, and we will make 2 attempts to redeliver within 3 business
              days.
              <br />
              <br />
              If both re-delivery attempts are unsuccessful, we will immediately
              notify you that we will hold the item for a further 30 days from
              the date of the initial notification. Our notification will
              include details about pick up location and opening hours.
              <br />
              <br />
              If you do not collect the item within the required period, you
              shall forfeit the item i.e. the item shall become mmart property
              and mmart may dispose of it in any manner that it determines
              appropriate e.g. by sale, charitable donation, recycling or
              destruction.
            </p>

            <h2 className="text-2xl font-semibold">7. No exchange</h2>
            <p>
              We don't offer exchanges. If you would like a different size or
              color, please return your unwanted item and place a new order.
            </p>

            <h2 className="text-2xl font-semibold">8. Further information</h2>
            <p>
              For further information please contact us on{" "}
              <a className="text-blue-500" href="mailto:info@mmartplus.com">
                info@mmartplus.com
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="-mt-10">
        <Footer />
      </div>
    </div>
  )
}

export default RefunPolicy