# KURCED + CalitoyMuse Commerce Architecture

## Brand structure

- **KURCED** is the primary lingerie/fashion brand and maintains its own application/repository.
- **CalitoyMuse** is a distinct Calitoy line/brand and should maintain its own application/repository at `JoS727/CalitoyMuse`.
- The brands share one Stripe account for operational simplicity, but transactions must remain separately reportable by brand.

## Repository structure

- `JoS727/Kurced` — canonical KURCED application repository.
- `JoS727/CalitoyMuse` — separate CalitoyMuse application repository to be created.

Each repo should own its storefront code, catalog presentation, brand assets, environment configuration, deployment configuration, and tests.

## Shared Stripe account, separate accounting

Use one Stripe account, with brand separation enforced through Stripe object metadata and product/catalog conventions.

### Required metadata

Every Checkout Session and PaymentIntent created by either storefront should include:

- `brand`: `kurced` or `calitoymuse`
- `storefront`: `kurced` or `calitoymuse`
- `order_source`: repository/app identifier

Products and Prices should also carry matching brand metadata when practical.

### Product naming convention

Use clear prefixes in Stripe product names and internal lookup keys:

- `KURCED | <Product Name>`
- `CalitoyMuse | <Product Name>`

Suggested lookup keys:

- `kurced_<sku_or_product>`
- `calitoymuse_<sku_or_product>`

### Accounting and reporting rule

Revenue, refunds, discounts, disputes, taxes, shipping revenue, and fees should be reported by the `brand` dimension so KURCED and CalitoyMuse can be reconciled independently even though settlement occurs through the same Stripe account.

Do not rely only on product names for accounting separation. The brand metadata should be treated as the primary machine-readable accounting key.

## Environment variables

Both storefronts may use the same Stripe account credentials, but each repo should define its own application environment and webhook configuration. Secrets must never be committed to Git.

Recommended non-secret identifiers:

- `BRAND_ID=kurced` in KURCED
- `BRAND_ID=calitoymuse` in CalitoyMuse

The application should inject this value into Stripe metadata for every transaction.

## Future growth

This model allows shared Stripe infrastructure while preserving brand-level reporting. If either brand later becomes a separate legal entity or requires separate settlement, tax, merchant-of-record, or payout behavior, migrate that brand to a separate Stripe account or appropriate multi-account architecture at that time.
