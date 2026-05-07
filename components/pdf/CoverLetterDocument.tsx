import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

export interface CoverLetterDocumentProps {
  coverLetter: string;
  candidateName: string;
  candidateEmail?: string;
  candidatePhone?: string;
  salutationText?: string;
  closingText?: string;
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    paddingTop: 40,
    paddingRight: 48,
    paddingBottom: 40,
    paddingLeft: 48,
    fontFamily: "Helvetica",
  },
  card: {
    flex: 1,
  },
  header: {
    marginBottom: 0,
  },
  name: {
    fontFamily: "Helvetica-Bold",
    fontSize: 22,
    color: "#000000",
    letterSpacing: -0.3,
  },
  contactRow: {
    marginTop: 5,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  contactItem: {
    fontSize: 9,
    color: "#777169",
    fontFamily: "Helvetica",
  },
  divider: {
    borderBottomWidth: 0.75,
    borderBottomColor: "#e5e5e5",
    marginTop: 18,
    marginBottom: 26,
  },
  salutation: {
    fontFamily: "Helvetica-Bold",
    fontSize: 11,
    color: "#000000",
    marginBottom: 14,
  },
  paragraph: {
    fontFamily: "Helvetica",
    fontSize: 10.5,
    lineHeight: 1.55,
    color: "#111111",
    marginBottom: 8,
    textAlign: "justify",
  },
  paragraphDense: {
    lineHeight: 1.42,
    marginBottom: 6,
  },
  closing: {
    marginTop: 20,
    fontFamily: "Helvetica",
    fontSize: 10.5,
    lineHeight: 1.45,
    color: "#111111",
    textAlign: "right",
  },
  closingName: {
    marginTop: 8,
    fontFamily: "Helvetica-Bold",
    fontSize: 10.5,
    color: "#000000",
    textAlign: "right",
  },
});

export default function CoverLetterDocument({
  coverLetter,
  candidateName,
  candidateEmail,
  candidatePhone,
  salutationText,
  closingText,
}: CoverLetterDocumentProps) {
  const paragraphs = coverLetter
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  const wordCount = coverLetter.trim().split(/\s+/).filter(Boolean).length;
  const isLongLetter = wordCount > 420 || paragraphs.length > 5;

  const contactParts = [candidateEmail, candidatePhone].filter(
    Boolean,
  ) as string[];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.card}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.name}>{candidateName}</Text>
            {contactParts.length > 0 && (
              <View style={styles.contactRow}>
                {contactParts.map((item) => (
                  <Text key={item} style={styles.contactItem}>
                    {item}
                  </Text>
                ))}
              </View>
            )}
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Salutation */}
          <Text style={styles.salutation}>
            {salutationText ?? "Dear Hiring Manager,"}
          </Text>

          {/* Body paragraphs */}
          {paragraphs.map((para, i) => (
            <Text
              key={i}
              style={
                isLongLetter
                  ? [styles.paragraph, styles.paragraphDense]
                  : styles.paragraph
              }
              widows={2}
              orphans={2}
            >
              {para}
            </Text>
          ))}

          {/* Closing */}
          <Text style={styles.closing}>{closingText ?? "Best regards,"}</Text>
          <Text style={styles.closingName}>{candidateName}</Text>
        </View>
      </Page>
    </Document>
  );
}
