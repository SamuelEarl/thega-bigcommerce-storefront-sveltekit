<script lang="ts">
  import { Link } from "$lib/client/components";
</script>

<h1>Returns, Exchanges, Refunds</h1>

<p>In an effort to cut waste and reduce overproduction we do not carry inventory. Our products are made specifically for you when you place an order. Considering this fact, our return, exchange, and refund policies are limited. Thank you for making thoughtful purchasing decisions!</p>

<h2>What's your return and exchange policy?</h2>

<p>We don't offer returns and exchanges unless there is something wrong with your order. If that is the case, then please let us know by <Link href="/contact-us">contacting us</Link> within 15 days of the delivery date or the estimated delivery date. We're not able to accept reports filed after this timeframe.</p>

<p>Any claims for misprinted/damaged/defective items must be submitted within 15 days after the product has been received. For packages lost in transit, all claims must be submitted no later than 15 days after the estimated delivery date. Claims deemed an error on our part are covered at our expense.</p>

<p>Please see the <Link href="#problem-report">Submitting a problem report</Link> section below.</p>

<h2>Do you offer refunds?</h2>

<p>Refunds are only offered to customers that receive the wrong items or damaged items. If any of these apply, please <Link href="/contact-us">contact us</Link> with photos of wrong/damaged items and we'll sort that out for you.</p>

<p>Please see the <Link href="#problem-report">Submitting a problem report</Link> section below.</p>

<h2>Can I exchange an item for a different size/color?</h2>

<p>At this time, we don't offer exchanges. If you're unsure which size would fit better, check out our sizing charts—we have one for every item listed on our store, in the product description section. Though rare, it's possible that an item you ordered was mislabeled. If that's the case, please <Link href="/contact-us">contact us</Link> within a week after receiving your order. Include your order number and photos of the mislabeled item, and we'll send you a new one, or issue a refund!</p>

<p>Please see the <Link href="#problem-report">Submitting a problem report</Link> section below.</p>

<!-- Bookmark Link -->
<div id="problem-report-container">
  <div id="problem-report"></div>
</div>

<h2>Submitting a problem report</h2>

<p>If you notice an issue with your order, please submit a problem report. You can also submit a problem report if more than five business days have passed after the order's estimated delivery date and you still haven't received the order.</p>

<p>Make sure to submit your problem report within 15 days of the delivery date or the estimated delivery date. We're not able to accept reports filed after this timeframe.</p>

<ol>
  <li>Go to our <Link href="/contact-us">Contact Us</Link> page to contact us.</li>
  <li>Enter <strong>Problem Report</strong> as the subject line.</li>
  <li>Describe the issue in detail and, if relevant, upload photos. To avoid delays, please include clear images with your initial report. For faster resolution, ensure your photos follow our guidelines. See the heading "Photo guidelines when submitting a problem report" below.</li>
</ol>

<h2>Photo guidelines when submitting a problem report</h2>

<p>To help us resolve your issue quickly and effectively, it's important to submit clear and accurate photos when reporting a problem with your order. This helps avoid follow-up requests for additional photos and speeds up the process.</p>

<p>Here are the types of photos we need, depending on the issue:</p>

<ul>
  <li><strong>Print placement issues:</strong> Lay the product flat and take a photo where the entire product is visible, clearly showing the print placement. It's helpful to include a measuring tool (like a ruler or measuring tape) in the photo to show the placement of the print relative to the width or height of the product.</li>
  <li><strong>Print quality issues:</strong> Take a well-lit photo of the affected area, ensuring the print details are clearly visible.</li>
  <li><strong>Damaged products or product defects (e.g., holes, stains):</strong> Include a photo of the damaged or defective part along with at least part of the product's design to help us identify the item.</li>
  <li><strong>Orders with multiple identical products in different sizes:</strong> Make sure the photo shows the size tags along with the affected products.</li>
  <li><strong>Incorrect product received:</strong> Include a photo of the product along with the packing slip visible in the same image.</li>
  <li>
    <strong>Size discrepancies:</strong>
    <ul>
      <li>If the size tag shows a different size than what was ordered, please submit a photo of the product with the size tag visible.</li>
      <li>If the size tag shows the correct size but the product dimensions are off, include photos of the product with a measuring tool, following the <strong>measuring guidelines</strong> in the <strong>Size guide</strong> section, which is found on the product page below the product description.</li>
    </ul>
  </li>
</ul>

<h2>Notification for EU consumers</h2>

<p>According to Article 16(c) and (e) of the Directive 2011/83/EU of the European Parliament and of the Council of 25 October 2011 on consumer rights, the right of withdrawal may not be provided for:</p>

<ol>
  <li>the supply of goods that are made to the consumer's specifications or are clearly personalized;</li>
  <li>sealed goods which were unsealed after delivery and thus aren't suitable for return due to health protection or hygiene reasons,</li>
</ol>

<p>therefore THEGA reserves the right to refuse returns at its sole discretion.</p>

<p>This Policy shall be governed and interpreted in accordance with the English language, regardless of any translations made for any purpose whatsoever.</p>

<style>
  @media (--xs-up) {
    #problem-report-container {
      position: relative;

      & #problem-report {
        position: absolute;
        top: -80px;
      }
    }
  }
</style>
