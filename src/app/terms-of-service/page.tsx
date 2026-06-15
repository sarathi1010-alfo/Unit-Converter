export default function TermsOfServicePage() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article className="prose prose-slate max-w-3xl mx-auto py-12">
      <h1>Terms of Service</h1>
      <p className="text-sm text-slate-500 mb-8">Last Updated: {currentDate}</p>

      <h2>1. Agreement to Terms</h2>
      <p>
        By accessing or using UnitConverter (a part of the alfo.online ecosystem), you agree
        to be bound by these Terms of Service. If you disagree with any part of the terms,
        you may not access the service.
      </p>

      <h2>2. Use License</h2>
      <p>
        Permission is granted to temporarily use the materials (information or software) on
        UnitConverter for personal, non-commercial transitory viewing only. This is the grant
        of a license, not a transfer of title.
      </p>

      <h2>3. Disclaimer</h2>
      <p>
        The materials on UnitConverter are provided on an &apos;as is&apos; basis. We make no
        warranties, expressed or implied, and hereby disclaim and negate all other warranties
        including, without limitation, implied warranties or conditions of merchantability,
        fitness for a particular purpose, or non-infringement of intellectual property or
        other violation of rights.
      </p>

      <h2>4. Limitations</h2>
      <p>
        In no event shall UnitConverter, alfo.online, or its suppliers be liable for any damages
        (including, without limitation, damages for loss of data or profit, or due to business
        interruption) arising out of the use or inability to use the materials on UnitConverter.
      </p>

      <h2>5. Links</h2>
      <p>
        UnitConverter has not reviewed all of the sites linked to its website and is not
        responsible for the contents of any such linked site. The inclusion of any link does
        not imply endorsement by UnitConverter of the site. Use of any such linked website is
        at the user&apos;s own risk.
      </p>
    </article>
  );
}
