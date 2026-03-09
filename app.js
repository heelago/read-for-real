/* ===================================================================
   Read for Real v2 — Socratic Reading Companion
   Sentence-level tagging + Socratic questions + Quiz
   =================================================================== */

const CATEGORY_META = {
  claim: {
    key: 'claim',
    label: 'טענה',
    color: '#6b7c5b',
    className: 'hl-claim',
  },
  evidence: {
    key: 'evidence',
    label: 'ראיה',
    color: '#5b6b7c',
    className: 'hl-evidence',
  },
  hedging: {
    key: 'hedging',
    label: 'הסתייגות',
    color: '#7c5b6b',
    className: 'hl-hedging',
  },
};

const STATUS_META = {
  correct: { label: 'נכון', symbol: '✓', className: 'status-correct' },
  missed: { label: 'לא זוהה', symbol: '✕', className: 'status-missed' },
  wrongCategory: { label: 'קטגוריה שגויה', symbol: '⚠', className: 'status-wrongCategory' },
  extra: { label: 'סימון מיותר', symbol: '·', className: 'status-extra' },
};

const CATEGORY_DESCRIPTIONS = {
  claim: {
    description: 'מה המחברים טוענים? מה הם רוצים שתקבלו?',
    example: 'We argue that GenAI systems are neither collaborators nor tutors.',
  },
  evidence: {
    description: 'מה הם מביאים כדי לתמוך? נתונים, דוגמאות, מקורות, ציטוטים.',
    example: 'Drawing on Plato and Harry Frankfurt, we suggest...',
  },
  hedging: {
    description: 'איפה הם מרככים, מסייגים, או מודים שהתמונה מורכבת?',
    example: 'It is plausible to suggest that...',
  },
};

const WELCOME_PROMPT_B64 = `
IyBSZWFkIGZvciBSZWFsIHYyIC0gR2VuZXJhdG9yIFByb21wdAojIyBTb2NyYXRpYyBSZWFkaW5nIENvbXBhbmlvbiB3aXRoIFNlbnRlbmNlIFRhZ2dpbmcs
IFNlbGYtQ2hlY2ssIFF1aXosIGFuZCBSZXZpZXcgTW9kZQoKQ29weSB0aGUgZW50aXJlIHByb21wdCBiZWxvdyBpbnRvIENsYXVkZSwgQ2hhdEdQVCwgR2Vt
aW5pLCBvciBDb2RleC4gVXBsb2FkIHlvdXIgYXJ0aWNsZSBQREYgYWxvbmdzaWRlIGl0LgoKLS0tCgojIyBUSEUgUFJPTVBUIChjb3B5IGZyb20gaGVyZSkK
CllvdSBhcmUgYW4gZXhwZXJ0IHBlZGFnb2dpY2FsIGRlc2lnbmVyIGFuZCBmcm9udC1lbmQgZGV2ZWxvcGVyIHNwZWNpYWxpemluZyBpbiBhY2FkZW1pYyBy
ZWFkaW5nIHRvb2xzIGZvciBoaWdoZXIgZWR1Y2F0aW9uLgoKSSBhbSBwcm92aWRpbmcgeW91IHdpdGggYW4gYWNhZGVtaWMgYXJ0aWNsZS4gQnVpbGQgYSAi
UmVhZCBmb3IgUmVhbCIgU29jcmF0aWMgUmVhZGluZyBDb21wYW5pb24gd2ViIGFwcCBmb3IgdGhpcyBhcnRpY2xlLgoKVGhpcyB0b29sIGlzIGEgcGlsb3Qg
dGhhdCBvdGhlciBpbnN0cnVjdG9ycyBzaG91bGQgYmUgYWJsZSB0byBhZGFwdCBmb3IgdGhlaXIgb3duIGFydGljbGVzLiBUaGUgb3V0cHV0IHNob3VsZCB0
aGVyZWZvcmUgYmU6CgotIGVhc3kgdG8gZWRpdAotIGVhc3kgdG8gZGVwbG95IGluIE1vb2RsZQotIGVhc3kgZm9yIGFub3RoZXIgaW5zdHJ1Y3RvciB0byBh
ZGFwdCBieSByZXBsYWNpbmcgY29udGVudCwgbm90IHJld3JpdGluZyB0aGUgYXBwCi0gdW5kZXJzdGFuZGFibGUgd2l0aG91dCBhIGJ1aWxkLWhlYXZ5IHNl
dHVwCgpQcmVmZXJyZWQgb3V0cHV0OgotIGEgc3RhdGljIGFwcCBtYWRlIG9mIGBpbmRleC5odG1sYCwgYGFwcC5qc2AsIGFuZCBgc3R5bGVzLmNzc2AKLSBw
bHVzIGEgZGF0YSBmaWxlIHN1Y2ggYXMgYF9hcnRpY2xlX2RhdGEuanNgCi0gcGx1cyBhIHNob3J0IFJFQURNRSBvciBoYW5kb2ZmIG5vdGUgZXhwbGFpbmlu
ZyB3aGF0IGFuIGluc3RydWN0b3Igd291bGQgZWRpdCBmb3IgYSBuZXcgYXJ0aWNsZQoKQWNjZXB0YWJsZSBmYWxsYmFjazoKLSBhIHNpbmdsZSBzZWxmLWNv
bnRhaW5lZCBIVE1MIGZpbGUgd2l0aCBpbmxpbmUgQ1NTL0pTCgpEbyBOT1QgZGVmYXVsdCB0byBhIG11bHRpLWZpbGUgUmVhY3QvVml0ZSBwcm9qZWN0IHVu
bGVzcyBleHBsaWNpdGx5IGFza2VkLiBUaGlzIHBpbG90IHNob3VsZCBiZSBwb3J0YWJsZSBhbmQgZWFzeSBmb3Igbm9uLXNwZWNpYWxpc3RzIHRvIHJldXNl
LgoKVGhlIGFwcCBjb21iaW5lcyBmb3VyIGtpbmRzIG9mIGVuZ2FnZW1lbnQ6CgoxLiAqKlNlbnRlbmNlLWxldmVsIHRhZ2dpbmcqKiAtIHN0dWRlbnRzIHRh
ZyBzZW50ZW5jZXMgYXMgQ2xhaW0gKGDXmNei16DXlGApLCBFdmlkZW5jZSAoYNeo15DXmdeUYCksIG9yIEhlZGdpbmcgKGDXlNeh16rXmdeZ15LXldeqYCkK
Mi4gKipTZWN0aW9uIHNlbGYtY2hlY2sqKiAtIGFmdGVyIHRhZ2dpbmcsIHN0dWRlbnRzIGNoZWNrIHRoZWlyIGNob2ljZXMgYW5kIHNlZSBpbmxpbmUgZXhw
bGFuYXRpb25zCjMuICoqU29jcmF0aWMgd3JpdGluZyoqIC0gc2hvcnQgb3Blbi1lbmRlZCBxdWVzdGlvbnMgYmV0d2VlbiBzZWN0aW9ucwo0LiAqKlF1aXoq
KiAtIGEgc2hvcnQgY29uY2VwdHVhbCBxdWl6IGF0IHRoZSBlbmQKClRoZSBhcHAgbXVzdCBhbHNvIGluY2x1ZGU6Ci0gYSBjb21iaW5lZCByZXBvcnQgc2Ny
ZWVuCi0gZG93bmxvYWRhYmxlIFJUTCByZXBvcnQgSFRNTAotIGEgbm9uLWVkaXRhYmxlIHJldmlldyBtb2RlIHRoYXQgcmV0dXJucyBzdHVkZW50cyB0byB0
aGUgYXJ0aWNsZSB3aXRoIGV4cGxhbmF0aW9ucwoKLS0tCgojIyMgU1RFUCAxOiBDb250ZW50IEFuYWx5c2lzCgpBbmFseXplIHRoZSBhcnRpY2xlIGFuZCBw
cm9kdWNlOgoKKipBLiBTZWN0aW9ucyAoMy02KS4qKiBCcmVhayB0aGUgYXJ0aWNsZSBpbnRvIGxvZ2ljYWwgYXJndW1lbnRhdGl2ZSBzZWN0aW9ucy4gRm9y
IGVhY2ggc2VjdGlvbiBwcm92aWRlOgotIGBpZGA6IHNob3J0IGtlYmFiLWNhc2UgaWRlbnRpZmllcgotIGB0aXRsZUhlYDogSGVicmV3IHNlY3Rpb24gdGl0
bGUKLSBgdGl0bGVFbmA6IEVuZ2xpc2ggc2VjdGlvbiB0aXRsZQoKKipCLiBQYXJhZ3JhcGhzLioqIEZvciBlYWNoIHNlY3Rpb24sIGluY2x1ZGUgYWxsIHBh
cmFncmFwaHMuIEZvciBlYWNoIHBhcmFncmFwaDoKLSBgaWRgOiB1bmlxdWUgaWRlbnRpZmllcgotIGB0cmFuc2xhdGlvbkhlYDogZnVsbCBIZWJyZXcgdHJh
bnNsYXRpb24gb2YgdGhlIHBhcmFncmFwaAotIHByZXNlcnZlIHJoZXRvcmljYWwgdG9uZSBhbmQgcGhpbG9zb3BoaWNhbCBwcmVjaXNpb24KLSB0cmFuc2xh
dGUgZnVsbHksIGRvIG5vdCBzdW1tYXJpemUKCioqQy4gU2VudGVuY2VzLioqIFNwbGl0IGVhY2ggcGFyYWdyYXBoIGludG8gaW5kaXZpZHVhbCBzZW50ZW5j
ZXMuIEZvciBlYWNoIHNlbnRlbmNlOgotIGBpZGA6IHVuaXF1ZSBpZGVudGlmaWVyCi0gYHRleHRgOiBleGFjdCBzZW50ZW5jZSB0ZXh0IGluIHRoZSBvcmln
aW5hbCBsYW5ndWFnZQoKKipELiBUYWcgS2V5LioqIEZvciBlYWNoIHNlbnRlbmNlIHRoYXQgY2FycmllcyBhcmd1bWVudGF0aXZlIHdlaWdodCwgY3JlYXRl
IGFuIGVudHJ5OgotIGB0eXBlYDogYCJjbGFpbSJgLCBgImV2aWRlbmNlImAsIG9yIGAiaGVkZ2luZyJgCi0gYGZiYDogYSAxLTIgc2VudGVuY2UgSGVicmV3
IGV4cGxhbmF0aW9uIG9mIHdoeSB0aGlzIHNlbnRlbmNlIGJlbG9uZ3MgaW4gdGhhdCBjYXRlZ29yeQoKUnVsZXMgZm9yIHRoZSB0YWcga2V5OgotIE5vdCBl
dmVyeSBzZW50ZW5jZSBiZWxvbmdzIGluIHRoZSBrZXkKLSBCYWNrZ3JvdW5kLCB0cmFuc2l0aW9ucywgZnJhbWluZywgYW5kIG1hbnkgcmhldG9yaWNhbCBx
dWVzdGlvbnMgc2hvdWxkIHN0YXkgdW50YWdnZWQKLSBBSSB1c3VhbGx5IG92ZXItdGFncy4gQmUgc2VsZWN0aXZlLgotIEFpbSBmb3IgYXJndW1lbnRhdGl2
ZWx5IG1lYW5pbmdmdWwgc2VudGVuY2VzLCBub3QganVzdCBhbnkgc2VudGVuY2Ugd2l0aCBhIGNpdGF0aW9uCgpDYXRlZ29yeSBkZWZpbml0aW9uczoKLSAq
KkNsYWltIChg15jXoteg15RgKSoqOiB0aGUgYXV0aG9yJ3MgcG9zaXRpb24sIGFyZ3VtZW50LCBjb25jbHVzaW9uLCBvciBzdWItY2xhaW0KLSAqKkV2aWRl
bmNlIChg16jXkNeZ15RgKSoqOiBleGFtcGxlcywgY2l0YXRpb25zLCBxdW90YXRpb25zLCBlbXBpcmljYWwgb2JzZXJ2YXRpb25zLCBjYXNlIG1hdGVyaWFs
LCBvciBleHBsYW5hdG9yeSBzdXBwb3J0Ci0gKipIZWRnaW5nIChg15TXodeq15nXmdeS15XXqmApKio6IHF1YWxpZmljYXRpb25zLCBsaW1pdHMsIGNhdmVh
dHMsIGNvbmNlc3Npb25zLCBwYXJ0aWFsIGZvcm11bGF0aW9ucwoKKipFLiBTb2NyYXRpYyBRdWVzdGlvbnMuKiogT25lIHF1ZXN0aW9uIHBlciBzZWN0aW9u
LCBpbiBIZWJyZXc6Ci0gYXNrIHdoYXQgdGhlIHRleHQgbWFrZXMgdGhlIHN0dWRlbnQgdGhpbmssIG5vdCB3aGF0IHRoZSBhdXRob3Igc2FpZAotIGNvbm5l
Y3QgdGhlIGFydGljbGUgdG8gbGl2ZWQgZXhwZXJpZW5jZSwgY291cnNlIHRoZW1lcywgbG9jYWwgY29udGV4dCwgb3IgYSBkaWZmaWN1bHQgY29tcGFyaXNv
bgotIGluY2x1ZGUgYSBgaGludGAKLSBpbmNsdWRlIGBtaW5DaGFyczogNTBgCi0gcXVlc3Rpb25zIHNob3VsZCBmZWVsIHNwZWNpZmljLCBzdXJwcmlzaW5n
LCBhbmQgcGVkYWdvZ2ljYWxseSBtZWFuaW5nZnVsCgoqKkYuIFF1aXogKDMtNSBxdWVzdGlvbnMpLioqCi0gbWl4IG11bHRpcGxlIGNob2ljZSBhbmQgdHJ1
ZS9mYWxzZQotIHRlc3QgY29uY2VwdHVhbCB1bmRlcnN0YW5kaW5nLCBub3QgdHJpdmlhCi0gaW5jbHVkZSBhdCBsZWFzdCBvbmUgcXVlc3Rpb24gd2hvc2Ug
YW5zd2VyIGRlcGVuZHMgb24gY2FyZWZ1bCByZWFkaW5nCi0gaW5jbHVkZSBhdCBsZWFzdCBvbmUgYHRydWVfZmFsc2VfanVzdGlmeWAgcXVlc3Rpb24gd2l0
aCBhIHNob3J0IGp1c3RpZmljYXRpb24gaGludAoKLS0tCgojIyMgU1RFUCAyOiBEYXRhIFN0cnVjdHVyZQoKR2VuZXJhdGUgYXJ0aWNsZSBkYXRhIGluIGEg
c3RydWN0dXJlIGxpa2U6CgpgYGBqcwpjb25zdCBhcnRpY2xlRGF0YSA9IHsKICBtZXRhOiB7CiAgICB0aXRsZTogIi4uLiIsCiAgICB0aXRsZUhlOiAiLi4u
IiwKICAgIGF1dGhvcjogIi4uLiIsCiAgICB5ZWFyOiAyMDI1LAogICAgc291cmNlOiAiLi4uIiwKICAgIGRvaTogIi4uLiIKICB9LAogIHNlY3Rpb25zOiBb
CiAgICB7CiAgICAgIGlkOiAiaW50cm8iLAogICAgICB0aXRsZUhlOiAiLi4uIiwKICAgICAgdGl0bGVFbjogIi4uLiIsCiAgICAgIHBhcmFncmFwaHM6IFsK
ICAgICAgICB7CiAgICAgICAgICBpZDogImludHJvLXAxIiwKICAgICAgICAgIHRyYW5zbGF0aW9uSGU6ICIuLi4iLAogICAgICAgICAgc2VudGVuY2VzOiBb
CiAgICAgICAgICAgIHsgaWQ6ICJpbnRyby1wMS1zMSIsIHRleHQ6ICIuLi4iIH0KICAgICAgICAgIF0KICAgICAgICB9CiAgICAgIF0sCiAgICAgIHNvY3Jh
dGljUXVlc3Rpb246IHsKICAgICAgICBpZDogInNxLWludHJvIiwKICAgICAgICB0ZXh0OiAiLi4uIiwKICAgICAgICBoaW50OiAiLi4uIiwKICAgICAgICBt
aW5DaGFyczogNTAKICAgICAgfQogICAgfQogIF0KfTsKCmNvbnN0IHRhZ0tleSA9IHsKICAiaW50cm8tcDEtczIiOiB7CiAgICB0eXBlOiAiY2xhaW0iLAog
ICAgZmI6ICIuLi4iCiAgfQp9OwoKY29uc3QgcXVpelF1ZXN0aW9ucyA9IFsKICB7CiAgICBpZDogInF1aXotMSIsCiAgICB0eXBlOiAibXVsdGlwbGVfY2hv
aWNlIiwKICAgIHRleHQ6ICIuLi4iLAogICAgb3B0aW9uczogWwogICAgICB7IGlkOiAiYSIsIHRleHQ6ICIuLi4iIH0sCiAgICAgIHsgaWQ6ICJiIiwgdGV4
dDogIi4uLiIgfQogICAgXSwKICAgIGNvcnJlY3RJZDogImIiCiAgfSwKICB7CiAgICBpZDogInF1aXotMiIsCiAgICB0eXBlOiAidHJ1ZV9mYWxzZV9qdXN0
aWZ5IiwKICAgIHRleHQ6ICIuLi4iLAogICAgY29ycmVjdEFuc3dlcjogZmFsc2UsCiAgICBqdXN0aWZpY2F0aW9uSGludDogIi4uLiIKICB9Cl07CmBgYAoK
SW1wb3J0YW50OgotIHVzZSBgZmJgIGFzIHRoZSBleHBsYW5hdGlvbiBmaWVsZCBpbiB0aGUgdGFnIGtleQotIGtlZXAgSURzIHN0YWJsZSBhbmQgaHVtYW4t
cmVhZGFibGUKLSBlbnN1cmUgZXZlcnkgYHRhZ0tleWAgc2VudGVuY2UgSUQgZXhpc3RzIGluIHRoZSBhcnRpY2xlCi0gc3RydWN0dXJlIHRoZSBjb250ZW50
IHNvIHRoYXQgYW4gaW5zdHJ1Y3RvciBjYW4gdXN1YWxseSBhZGFwdCB0aGUgcGlsb3QgYnkgZWRpdGluZyB0aGUgZGF0YSBmaWxlIHJhdGhlciB0aGFuIHRo
ZSByZW5kZXJpbmcgbG9naWMKCi0tLQoKIyMjIFNURVAgMzogSW50ZXJhY3Rpb24gYW5kIFBlZGFnb2d5IFJlcXVpcmVtZW50cwoKIyMjIyBPdmVyYWxsIGZs
b3cKCmB3ZWxjb21lIC0+IGluc3RydWN0aW9ucyAtPiBzZWN0aW9uIHJlYWRpbmcgLT4gc2VsZi1jaGVjayAtPiBTb2NyYXRpYyBxdWVzdGlvbiAtPiBuZXh0
IHNlY3Rpb24gLT4gcXVpeiAtPiByZXBvcnQgLT4gcmV2aWV3IG1vZGVgCgojIyMjIFdlbGNvbWUgc2NyZWVuCgpUaGUgd2VsY29tZSBzY3JlZW4gbXVzdCBj
bGVhcmx5IGV4cGxhaW4gdGhlIHBlZGFnb2d5OgotIHN0dWRlbnRzIGZpcnN0IG1hcmsgaG93IHRoZSBhcmd1bWVudCB3b3JrcwotIHRoZW4gdGhleSBzZWxm
LWNoZWNrIHdpdGggZXhwbGFuYXRpb25zCi0gdGhlbiB0aGV5IHdyaXRlCi0gdGhlbiB0aGV5IHRha2UgYSBzaG9ydCBxdWl6Ci0gdGhlbiB0aGV5IHJlY2Vp
dmUgYSBjb21iaW5lZCByZXBvcnQgYW5kIGNhbiByZXR1cm4gdG8gdGhlIGFydGljbGUgaW4gcmV2aWV3IG1vZGUKCkl0IHNob3VsZCBtYWtlIGNsZWFyIHRo
YXQgdGhlIGdvYWwgaXMgbm90IGp1c3QgdW5kZXJzdGFuZGluZyB0aGUgdG9waWMsIGJ1dCB1bmRlcnN0YW5kaW5nIGhvdyBhY2FkZW1pYyBhcmd1bWVudCB3
b3JrcyBmcm9tIHRoZSBpbnNpZGUuCgojIyMjIFNlbnRlbmNlIHRhZ2dpbmcKCi0gZWFjaCBzZW50ZW5jZSBhcHBlYXJzIGFzIGEgY2xpY2thYmxlIHVuaXQg
aW5zaWRlIGEgcGFyYWdyYXBoCi0gYXJ0aWNsZSBwYXJhZ3JhcGhzIGFyZSBMVFIgaWYgdGhlIGFydGljbGUgaXMgRW5nbGlzaAotIGNsaWNraW5nIGEgc2Vu
dGVuY2Ugb3BlbnMgYSBzbWFsbCBleHBsaWNpdCBwaWNrZXIvbWVudQotIHBpY2tlciBpbmNsdWRlczoKICAtIGDXmNei16DXlGAKICAtIGDXqNeQ15nXlGAK
ICAtIGDXlNeh16rXmdeZ15LXldeqYAogIC0gYNeU16HXqGAKLSBkbyBub3QgdXNlIGN5Y2xlLWNsaWNrIGFzIHRoZSBkZWZhdWx0IGludGVyYWN0aW9uCi0g
Y2xpY2tpbmcgb3V0c2lkZSBjbG9zZXMgdGhlIHBpY2tlcgotIGNob3NlbiB0YWdzIHNob3VsZCBiZSB2aXNpYmx5IHN0eWxlZCB3aXRoIGNvbG9yICsgc3Vi
dGxlIGlubGluZSBsYWJlbAoKIyMjIyBTZWxmLWNoZWNrIHBlciBzZWN0aW9uCgotIGVhY2ggc2VjdGlvbiBoYXMgYSBg15HXk9en15Ug16rXqdeV15HXldeq
YCBidXR0b24gYXQgdGhlIGJvdHRvbQotIGl0IGJlY29tZXMgZW5hYmxlZCBvbmx5IGFmdGVyIHRoZSBzdHVkZW50IGhhcyB0YWdnZWQgYXQgbGVhc3Qgb25l
IHNlbnRlbmNlIGluIGVhY2ggY2F0ZWdvcnkgdGhhdCBhY3R1YWxseSBhcHBlYXJzIGluIHRoYXQgc2VjdGlvbuKAmXMga2V5Ci0gaW1wb3J0YW50OiBpZiBh
IHNlY3Rpb24gaGFzIG5vIGhlZGdpbmcgaW4gdGhlIGtleSwgZG8gbm90IHJlcXVpcmUgaGVkZ2luZyBmb3IgdW5sb2NrCi0gY2xpY2tpbmcgc2VsZi1jaGVj
azoKICAtIGxvY2tzIHRoYXQgc2VjdGlvbuKAmXMgdGFncwogIC0gc2hvd3MgaW5saW5lIGZlZWRiYWNrCiAgLSByZXZlYWxzIG1pc3NlZCBrZXkgc2VudGVu
Y2VzIHdpdGggZGFzaGVkIHN0eWxpbmcKCkZlZWRiYWNrIHN0YXRlczoKLSAqKmNvcnJlY3QqKjogZ3JlZW4gY29uZmlybWF0aW9uICsgYGZiYAotICoqd3Jv
bmcgY2F0ZWdvcnkqKjogIteh15nXnteg16rXnSDXm1tYXSwg15DXkdecINeW15Ug15HXotem150gW1ldIiArIGBmYmAKLSAqKm1pc3NlZCoqOiBkYXNoZWQg
ZXhwZWN0ZWQtY29sb3Igc2VudGVuY2UgKyBgZmJgCi0gKipleHRyYSoqOiBncmV5IG5vdGUgaW5kaWNhdGluZyBiYWNrZ3JvdW5kL2NvbnRleHQsIG5vIHBl
bmFsdHkKCiMjIyMgU29jcmF0aWMgcXVlc3Rpb24gc2NyZWVuCgotIGFwcGVhcnMgYWZ0ZXIgc2VsZi1jaGVjaywgbm90IGJlZm9yZQotIGluY2x1ZGUgYSBg
15fXlteo15Qg15zXmNen16HXmGAgYnV0dG9uIHNvIHN0dWRlbnRzIGNhbiByZXJlYWQgdGhlIGNoZWNrZWQgc2VjdGlvbgotIHRleHRhcmVhIG11c3QgYmxv
Y2sgcGFzdGUvY29weS9jdXQvZHJvcAotIHNob3cgY2hhcmFjdGVyIGNvdW50ZXIKLSByZXF1aXJlIG1pbmltdW0gbGVuZ3RoIGJlZm9yZSBzdWJtaXNzaW9u
Ci0gZmlyc3QgcXVlc3Rpb24gc2hvdWxkIHNob3cgYSBmcmljdGlvbiBiYW5uZXIKCiMjIyMgUXVpegoKLSBhcHBlYXJzIGFmdGVyIGFsbCBzZWN0aW9ucwot
IG11bHRpcGxlIGNob2ljZSBxdWVzdGlvbnMgcmVxdWlyZSBhbiBhbnN3ZXIKLSBgdHJ1ZV9mYWxzZV9qdXN0aWZ5YCBxdWVzdGlvbnMgcmVxdWlyZToKICAt
IGEgdHJ1ZS9mYWxzZSBjaG9pY2UKICAtIGEgc2hvcnQgdHlwZWQganVzdGlmaWNhdGlvbiBiZWZvcmUgdGhlIHN0dWRlbnQgY2FuIHByb2NlZWQKLSBxdWl6
IGlzIHBhcnQgb2YgdGhlIGNvcmUgZXhwZXJpZW5jZSwgbm90IG9wdGlvbmFsIGdhcm5pc2gKCiMjIyMgUmVwb3J0CgpUaGUgcmVwb3J0IG11c3QgaW5jbHVk
ZToKLSB0YWdnaW5nIHNjb3JlIG92ZXJhbGwKLSBwZXItY2F0ZWdvcnkgYnJlYWtkb3duCi0gU29jcmF0aWMgYW5zd2VycwotIHF1aXogc2NvcmUKLSBxdWVz
dGlvbi1ieS1xdWVzdGlvbiBxdWl6IHJldmlldwotIHJlYWRpbmcgdGltZSAvIHRyYW5zbGF0aW9uIHVzYWdlIGlmIHRyYWNrZWQKLSBhbiBhdXRvLWdlbmVy
YXRlZCBIZWJyZXcgdGlwIGJhc2VkIG9uIHdlYWtlc3QgY2F0ZWdvcnkKLSBidXR0b246IGDXl9eW16jXlSDXnNee15DXnteoINei150g15TXodeR16jXmded
YAotIGJ1dHRvbjogZG93bmxvYWQgcmVwb3J0CgojIyMjIFJldmlldyBtb2RlCgpBZnRlciB0aGUgcmVwb3J0LCBzdHVkZW50cyBjYW4gcmV0dXJuIHRvIHRo
ZSBhcnRpY2xlIGluIG5vbi1lZGl0YWJsZSByZXZpZXcgbW9kZToKLSBjb3JyZWN0bHkgdGFnZ2VkIHNlbnRlbmNlczogc29saWQgZXhwZWN0ZWQgc3R5bGlu
ZwotIG1pc3NlZCBzZW50ZW5jZXM6IGRhc2hlZCBleHBlY3RlZCBzdHlsaW5nCi0gd3JvbmctY2F0ZWdvcnkgc2VudGVuY2VzOiBzaG93IHN0dWRlbnQgY2hv
aWNlIGNyb3NzZWQgb3V0IGFuZCBleHBlY3RlZCB0eXBlIGJlbG93Ci0gc2VudGVuY2VzIG5vdCBpbiB0aGUga2V5OiBtdXRlZCAvIG5vbi1jbGlja2FibGUK
LSBjbGlja2luZyBhIG1hcmtlZCBzZW50ZW5jZSBvcGVucyBhbiBleHBsYW5hdGlvbiBwYW5lbCB3aXRoOgogIC0gZXhwZWN0ZWQgdGFnCiAgLSBgZmJgCiAg
LSBpZiB3cm9uZzogY2hvc2VuIHZzIGV4cGVjdGVkCgotLS0KCiMjIyBTVEVQIDQ6IFZpc3VhbCBEaXJlY3Rpb24KClVzZSB0aGUgIlVuZGVyZ3JvdW5kIExp
YnJhcnkiIGRlc2lnbiBsYW5ndWFnZToKCmBgYGNzcwotLWJnLXBhcmNobWVudDogI2ZhZjhmNDsKLS1zdXJmYWNlLWNyZWFtOiAjZmZmZWZhOwotLXN1cmZh
Y2UtZGVlcDogI2YwZWRlNjsKLS10ZXh0LWJhcms6ICMzZDM1Mjk7Ci0tdGV4dC1iYXJrLWxpZ2h0OiAjNWE0ZjQwOwotLXRleHQtbXV0ZWQ6ICM4YTdkNmI7
Ci0tY29sb3ItY2xhaW06ICM2YjdjNWI7Ci0tY29sb3ItZXZpZGVuY2U6ICM1YjZiN2M7Ci0tY29sb3ItaGVkZ2luZzogIzdjNWI2YjsKLS1ib3JkZXI6ICNk
ZGQ4Y2M7CmBgYAoKVHlwb2dyYXBoeToKLSBIZWJyZXcgVUk6IGBIZWVib2AKLSBFbmdsaXNoIGFydGljbGUgdGV4dDogYEdlb3JnaWEsICJUaW1lcyBOZXcg
Um9tYW4iLCBzZXJpZmAKClZpc3VhbCBydWxlczoKLSB3YXJtIHBhcmNobWVudCBiYWNrZ3JvdW5kCi0gZGFyayBiYXJrIGhlYWRlcgotIHN0cm9uZyBzZXJp
Zi9MVFIgYXJ0aWNsZSBpc2xhbmRzCi0gbm8gZ2VuZXJpYyBBSSBhZXN0aGV0aWMKLSBubyBpY29uIGxpYnJhcmllcwotIG5vIGVtb2ppIGluIFVJIGNocm9t
ZQoKSGVhZGVyOgotIHN0aWNreSBkYXJrIGhlYWRlcgotIHRpdGxlOiBg16fXldeo15DXmdedINeQ15fXqNeqYAotIHN1YnRpdGxlOiBgU29jcmF0aWMgUmVh
ZGluZyBDb21wYW5pb25gCi0gb3B0aW9uYWwgc21hbGwgY3JlZGl0IGxpbmsgaXMgZmluZQoKLS0tCgojIyMgU1RFUCA1OiBUZWNobmljYWwgQ29uc3RyYWlu
dHMKCi0gcHJlZmVyIHBsYWluIEhUTUwvQ1NTL0pTIG92ZXIgZnJhbWV3b3JrLWhlYXZ5IG91dHB1dAotIG5vIGJhY2tlbmQKLSBubyBhdXRoCi0gbm8gZGF0
YWJhc2UKLSBubyBsb2NhbFN0b3JhZ2Uvc2Vzc2lvblN0b3JhZ2UKLSBtdXN0IHdvcmsgYXMgYSBzdGF0aWMgTW9vZGxlLWZyaWVuZGx5IGFydGlmYWN0Ci0g
YWxsIGNvcHkgYW5kIGludGVyYWN0aXZlIHRleHQgc2hvdWxkIGJlIGluIEhlYnJldyBleGNlcHQgYXJ0aWNsZSB0ZXh0Ci0gdXNlIGB1c2VyLXNlbGVjdDog
bm9uZWAgb24gYXJ0aWNsZSB0ZXh0IGFuZCB0cmFuc2xhdGlvbnMKCkxhbmd1YWdlIGhhbmRsaW5nOgotIEVuZ2xpc2ggYXJ0aWNsZSAtPiBFbmdsaXNoIGFy
dGljbGUgdGV4dCArIEhlYnJldyBVSSArIEhlYnJldyB0cmFuc2xhdGlvbnMKLSBIZWJyZXcgYXJ0aWNsZSAtPiBSVEwgYXJ0aWNsZSB0ZXh0LCBubyB0cmFu
c2xhdGlvbiB0b2dnbGUgbmVlZGVkCi0gb3RoZXIgbGFuZ3VhZ2UgLT4gcHJlc2VydmUgb3JpZ2luYWwgZGlyZWN0aW9uIGFzIGFwcHJvcHJpYXRlLCB0cmFu
c2xhdGlvbnMgaW4gSGVicmV3CgotLS0KCiMjIyBTVEVQIDY6IERlcGxveW1lbnQgR3VpZGFuY2UKCkZvciBNb29kbGUgZGVwbG95bWVudCwgb3B0aW1pemUg
Zm9yIG9uZSBvZiB0aGVzZToKCjEuIHN0YXRpYyBmb2xkZXIgdXBsb2FkIChgaW5kZXguaHRtbGAgKyBhc3NldHMpCjIuIHNpbmdsZSBIVE1MIGZpbGUKMy4g
aWZyYW1lIGVtYmVkIGZyb20gYSBzdGF0aWMgaG9zdAoKSWYgZ2VuZXJhdGluZyBkb3dubG9hZGFibGUgcmVwb3J0IEhUTUw6Ci0gbWFrZSBpdCBleHBsaWNp
dGx5IFJUTAotIHVzZSBgZGlyPSJydGwiYCBhbmQgYHRleHQtYWxpZ246cmlnaHRgCi0ga2VlcCBFbmdsaXNoIGFydGljbGUgZXhjZXJwdHMgYXMgTFRSIGlz
bGFuZHMgaW5zaWRlIHRoZSByZXBvcnQKLSBrZWVwIHRoZSBkb3dubG9hZGVkIGZpbGUgdXNhYmxlIGFzIGEgc3RhbmRhbG9uZSBoYW5kLWluIGFydGlmYWN0
CgotLS0KCiMjIyBTVEVQIDc6IE91dHB1dCBFeHBlY3RhdGlvbnMKCk91dHB1dDoKLSB0aGUgY29kZQotIGEgc2hvcnQgZXhwbGFuYXRpb24gb2YgdGhlIGRh
dGEgc3RydWN0dXJlCi0gYSBzaG9ydCBub3RlIGV4cGxhaW5pbmcgaG93IGFub3RoZXIgaW5zdHJ1Y3RvciB3b3VsZCBzd2FwIGluIGEgbmV3IGFydGljbGUK
LSBhIHNob3J0IGNoZWNrbGlzdCBvZiB3aGF0IHRoZSBpbnN0cnVjdG9yIG11c3QgcmV2aWV3IG1hbnVhbGx5OgogIC0gdGFnIGtleQogIC0gSGVicmV3IHRy
YW5zbGF0aW9ucwogIC0gU29jcmF0aWMgcXVlc3Rpb25zCiAgLSBxdWl6CiAgLSBgZmJgIGV4cGxhbmF0aW9ucwogIC0gZXhwb3J0ZWQgcmVwb3J0IEhUTUwg
LyBSVEwgbGF5b3V0CgpEbyBub3Qgb3V0cHV0IGdlbmVyaWMgcGxhY2Vob2xkZXIgY29udGVudC4gVXNlIHRoZSBhY3R1YWwgYXJ0aWNsZS4KCiMjIEVORCBP
RiBQUk9NUFQKClJldmlldyB0aGUgcmVzdWx0IGNhcmVmdWxseSBiZWZvcmUgZGVwbG95bWVudDoKLSBBSSBvdmVyLXRhZ3MgY2xhaW1zCi0gQUkgdW5kZXIt
dGFncyBoZWRnaW5nCi0gdHJhbnNsYXRpb25zIG5lZWQgaHVtYW4gY2hlY2tpbmcKLSB0aGUgYmVzdCBgZmJgIGV4cGxhbmF0aW9ucyBleHBsYWluIHdoeSB0
aGUgc2VudGVuY2UgbWF0dGVycywgbm90IGp1c3Qgd2hhdCBjYXRlZ29yeSBpdCBpcwotIG1ha2Ugc3VyZSB0aGUgcXVpeiBpcyBnZW51aW5lbHkgY29uY2Vw
dHVhbAo=
`.replace(/\s+/g, '');

const WELCOME_README_B64 = `
PGRpdiBkaXI9InJ0bCI+CgojINen15XXqNeQ15nXnSDXkNeX16jXqiB2MgoK15LXqNeh16ogdjIg16nXnCBgUmVhZCBmb3IgUmVhbGAg15TXmdeQINeb15zX
mSDXp9eo15nXkNeUINeQ16fXk9ee15nXqiDXotedINeQ16jXkdei15Qg16jXm9eZ15HXmdedINee16nXnNeZ157XmdedOgoKMS4g16HXmdee15XXnyDXntep
16TXmNeZ150g15zXpNeZINeq16TXp9eZ15Mg15jXmdei15XXoNeZOiDXmNei16DXlCwg16jXkNeZ15QsINeU16HXqteZ15nXkteV16ouCjIuINeR15PXmden
15Qg16LXptee15nXqiDXkdeh15XXoyDXm9ecINeX15zXpyDXotedINeU16HXkdeo15nXnSDXotecINeh15nXnteV16DXmdedINeg15vXldeg15nXnSwg16nX
kteV15nXmdedINeV157Xqdek15jXmdedINep16TXodek16HXqtedLgozLiDXm9eq15nXkdeUINeh15XXp9eo15jXmdeqINen16bXqNeUINeR15nXnyDXl9ec
16fXmSDXlNee15DXnteoLgo0LiDXnteR15fXnyDXp9em16gg15HXodeZ15XXnSwg15zXpNeg15kg15TXk9eV15cg15TXnteh15vXnS4KCteU16LXmden16jX
ldefINeU16TXk9eS15XXkteZINek16nXldeYOiDXnNeQINeo16cgItec15TXkdeZ158g15DXqiDXlNeY16fXodeYIiwg15DXnNeQINec15zXnteV15Mg15DX
mdeaINeY15nXoteV158g15DXp9eT157XmSDXoteV15HXkyDXnteR16TXoNeZ150uINec15vXnyDXlNeb15zXmSDXnteQ15gg15HXm9eV15XXoNeUINeQ16og
15TXp9eo15nXkNeULCDXk9eV16jXqSDXodeZ157XldefINeZ15PXoNeZLCDXm9eV15zXnCDXkdeT15nXp9eUINei16bXnteZ16og15zXpNeg15kg15TXlNee
16nXmiwg157Xldeh15nXoyDXnteR15fXnyDXp9em16gg15HXodeV16MsINeV15fXldeh150g15TXk9eR16fXlCDXkdep15DXnNeV16og15TXm9eq15nXkdeU
LgoK15bXlNeVINek15nXmdec15XXmCDXqdee15nXldei15Mg15LXnSDXnNee16jXpteV16og15XXnteo16bXmdedINeQ15fXqNeZ1506INeQ16TXqdeoINec
15TXl9ec15nXoyDXkNeqINeU16rXldeb158g16nXnCDXlNee15DXnteoLCDXntek16rXlyDXlNeh15nXnteV158sINeU16nXkNec15XXqiDXldeU157XkdeX
158g15HXoteZ16fXqCDXk9eo15ogYF9hcnRpY2xlX2RhdGEuanNgLCDXkdec15kg15zXoteR15XXqCDXnNek16jXldeZ16fXmCBidWlsZC1oZWF2eS4KCiMj
INee15Qg16LXldeR15Mg15vXqNeS16IKCi0g16fXqNeZ15DXqiDXlNee15DXnteoINeU157XnNeQINeR15DXoNeS15zXmdeqLCDXnteX15XXnNenINec15fX
nNen15nXnSwg16TXoden15DXldeqINeV157Xqdek15jXmdedCi0g16rXqNeS15XXnSDXoteR16jXmSDXnNeb15wg16TXoden15Qg15HXnNeX15nXpteUCi0g
16HXmdee15XXnyDXntep16TXmNeZ150g15PXqNeaINeq16TXqNeZ15gg15HXl9eZ16jXlCDXp9eY158KICAtINec15fXmdem15Qg16LXnCDXntep16TXmCDX
pNeV16rXl9eqINeR15fXmdeo15Qg157XpNeV16jXqdeqCiAgLSDXmNei16DXlCAvINeo15DXmdeUIC8g15TXodeq15nXmdeS15XXqiAvINeU16HXqAotINeR
15PXmden15Qg16LXptee15nXqiDXkdeh15XXoyDXm9ecINeX15zXpwogIC0g16DXpNeq15fXqiDXkNeX16jXmSDXqdeh15XXnteg15Ug15zXpNeX15XXqiDX
lNen15jXkteV16jXmdeV16og16nXnteV16TXmdei15XXqiDXkdee16TXqteXINep15wg15DXldeq15Ug15fXnNenCiAgLSDXoNeV16LXnNeqINeQ16og15TX
odeZ157Xldeg15nXnSDXkdeX15zXpwogIC0g157XpteZ15LXlCDXntep15XXkSBpbmxpbmUg16LXnCDXodeZ157Xldeg15nXnSDXoNeb15XXoNeZ150sINep
15LXldeZ15nXnSwg157XmdeV16rXqNeZ150g15XXntep16TXmNeZ150g16nXpNeh16TXodeq150KLSDXqdeQ15zXldeqINeh15XXp9eo15jXmdeV16og15HX
mdefINeX15zXp9eZINeU157XkNee16gKICAtINeX16HXmdee16ogcGFzdGUvY29weS9jdXQvZHJvcAogIC0g157Xmdeg15nXnteV150gNTAg16rXldeV15nX
nQotINee15HXl9efINen16bXqCDXkdeh15XXowotINeT15XXlyDXnteh15vXnSDXotedOgogIC0g16bXmdeV158g16HXmdee15XXnyDXm9eV15zXnCDXldec
16TXmSDXp9eY15LXldeo15nXlAogIC0g16rXqdeV15HXldeqINeh15XXp9eo15jXmdeV16oKICAtINem15nXldefINee15HXl9efCiAgLSDXltee158g16fX
qNeZ15DXlCDXldek16rXmdeX16og16rXqNeS15XXnteZ150KLSDXntem15EgcmV2aWV3INee15TXk9eV15cKICAtICLXl9eW16jXlSDXnNee15DXnteoINei
150g15TXodeR16jXmdedIgogIC0g15vXnCDXntep16TXmCDXqdee15XXpNeZ16Ig15HXntek16rXlyDXnteh15XXntefCiAgLSDXnNeX15nXpteUINei15wg
157Xqdek15gg16TXldeq15fXqiDXlNeh15HXqCDXqdecINeU157XqNem15QKCiMjINee15HXoNeUINeU16fXkdem15nXnSDXkdek15XXotecCgpgYGB0ZXh0
CmluZGV4Lmh0bWwgICAgICAgICAgICAgICAgICDihpAg16DXp9eV15PXqiDXlNeb16DXmdeh15Qg16nXnCB2MgphcHAuanMgICAgICAgICAgICAgICAgICAg
ICAg4oaQINeU15zXldeS15nXp9eUINep15wg15TXkNek15zXmden16bXmdeUCnN0eWxlcy5jc3MgICAgICAgICAgICAgICAgICDihpAg15vXnCDXlNeh15LX
oNeV16DXldeqCl9hcnRpY2xlX2RhdGEuanMgICAgICAgICAgICDihpAg15TXnteQ157XqCwg157XpNeq15cg15TXodeZ157XldefLCDXqdeQ15zXldeqINeV
157XkdeX158KdjItc2NyZWVuLWNvcHkubWQgICAgICAgICAgIOKGkCDXoNeV16HXl9eZINeU157Xodeb15nXnSDXlNee16LXldeT15vXoNeZ150KcmVhZC1m
b3ItcmVhbC12Mi1zcGVjICgxKS5tZOKGkCDXlNeh16TXpyDXlNee16fXldeo15kKcmVhZC1mb3ItcmVhbC12Mi5qc3ggICAgICAgIOKGkCDXmNeZ15XXmNeq
IFJlYWN0INee15XXp9eT157Xqiwg15zXkCDXlC1lbnRyeSDXlNek16LXmdecCmBgYAoKIyMg15TXoteo15Qg16LXnCDXntek16rXlyDXlNeh15nXnteV158K
CteU15DXpNec15nXp9em15nXlCDXp9eV16jXkNeqINeb16jXkteiINeQ16og15TXlNeh15HXqCDXnNeb15wg157Xqdek15gg157XlNep15PXlCDXlNeR15As
INec16TXmSDXodeT16gg16LXk9eZ16TXldeqOgoKMS4gYGZiYAoyLiBgZmVlZGJhY2tNaXNzZWRgCjMuIGBmZWVkYmFja0NvcnJlY3RgCgrXm9ec15XXnteo
LCDXkNedINeR16LXqteZ15Mg16jXldem15nXnSDXnNeQ15fXkyDXkNeqINeU157Xkdeg15Qg15wtYGZiYCDXkdec15HXkywg15TXp9eV15Mg15vXkdeoINee
15XXm9efINec15bXlC4KCiMjINeQ15nXmiDXlNeW16jXmdee15Qg16DXqNeQ15nXqgoKMS4g15HXqNeV15vXmdedINeU15HXkNeZ150KMi4g15TXldeo15DX
ldeqCjMuINeX15zXpyDXp9eo15nXkNeUCjQuINeR15PXp9eVINeq16nXldeR15XXqgo1LiDXqdeQ15zXqiDXm9eq15nXkdeUCjYuINeX15zXpyDXlNeR15AK
Ny4g157XkdeX158g16fXpteoCjguINeT15XXlyDXnteh15vXnQo5LiDXl9eW16jXlSDXnNee15DXnteoINei150g15TXodeR16jXmdedCgojIyDXnteUINeX
16nXldeRINec16LXkdeV16gg16LXnNeZ15Ug15nXk9eg15nXqgoKLSDXoteR16jXmdeqINeR16rXqNeS15XXnteZ150KICAtINeZ16kg16LXk9eZ15nXnyDX
nten15XXnteV16og16nXk9eV16jXqdeZ150g15zXmdeY15XXqSDXkNeg15XXqdeZLCDXkdee15nXldeX15Mg15HXnteV16DXl9eZ150g16TXmdec15XXodeV
16TXmdeZ150KLSDXntek16rXlyDXlNeh15nXnteV158KICAtINec15XXldeT15Ag16nXnNeQINeh15XXnteg15Ug15nXldeq16gg157Xk9eZINee16nXpNeY
15nXnSDXm9eY16LXoNeV16og15DXlSDXqNeQ15nXldeqCi0g15TXodeR16jXmdedIChgZmJgKQogIC0g15TXlNeh15HXqCDXpteo15nXmiDXnNeV157XqCDX
nNee15Qg15TXntep16TXmCDXl9ep15XXkSwg15zXkCDXqNenINee15Qg15TXp9eY15LXldeo15nXlCDXqdec15UKLSDXqdeQ15zXldeqINeh15XXp9eo15jX
mdeV16oKICAtINeb15PXkNeZINec15XXldeT15Ag16nXlNefINeR15DXnteqINee15fXmdeZ15HXldeqINeX16nXmdeR15QsINec15Ag16jXpyDXqdec15nX
pNeUCi0g157XkdeX158KICAtINeb15PXkNeZINec15XXldeT15Ag16nXlNep15DXnNeV16og15HXldeT16fXldeqINeU15HXoNeUINee15XXqdeS15nXqiDX
ldec15Ag16jXpyDXlteZ15vXqNeV158g16nXnCDXpNeo15gg15HXldeT15MKLSDXk9eV15cg15zXlNeV16jXk9eUCiAgLSDXnNeV15XXk9eQINep15nXmdem
15XXkCDXlC1IVE1MINeg16nXkNeoIFJUTCDXldep15TXkNeZ15nXnSDXlNeQ16DXktec15nXmdedINeg16nXkNeo15nXnSDXp9eo15nXkNeZ150KCiMjINeU
16LXqNeqINee15nXnteV16kKCtec157XqNeV16og16nXp9eZ15nXnteqINeR16rXmden15nXmdeUINeY15nXldeY16ogUmVhY3QgKGByZWFkLWZvci1yZWFs
LXYyLmpzeGApLCDXlNeS16jXodeUINeU16TXoteZ15zXlCDXm9eo15LXoiDXlNeZ15Ag15DXpNec15nXp9em15nXlCDXodeY15jXmdeqINek16nXldeY15Qg
16nXnCBgSFRNTCArIEpTICsgQ1NTYC4g15bXlCDXnteb15XXldefOiDXp9ecINeZ15XXqteoINec16LXqNeV15osINec15HXk9eV16csINeV15zXpNeo15XX
oSDXkNeV16rXlCDXm9ee15Ug16nXlNeZ15AuCgo8L2Rpdj4K
`.replace(/\s+/g, '');

const WELCOME_RESOURCES = {
  prompt: decodeBase64Utf8(WELCOME_PROMPT_B64),
  readme: decodeBase64Utf8(WELCOME_README_B64),
};

/* ------- state ------- */

const state = {
  phase: 'welcome',
  student: { name: '', id: '' },
  currentSectionIndex: 0,
  tagsBySentence: {},
  translationOpen: {},
  translationViewed: {},
  socraticAnswers: {},
  socraticHintOpen: {},
  quizAnswers: {},
  quizJustifications: {},
  sessionStartTime: null,
  sectionStartTimes: {},
  sectionEndTimes: {},
  inlineNotice: '',
  noticeTimerId: null,
  frictionBannerShown: false,
  checkedSections: {},
  reviewMode: false,
  activeReviewSentenceId: null,
  activePickerSentenceId: null,
  welcomeResource: '',
};

/* ------- bootstrap ------- */

const root = document.getElementById('root');

if (!root) {
  throw new Error('Root element not found.');
}

root.addEventListener('click', handleRootClick);
root.addEventListener('input', handleRootInput);
root.addEventListener('change', handleRootChange);
render();

/* ===================================================================
   RENDER DISPATCHER
   =================================================================== */

function render() {
  let content;

  switch (state.phase) {
    case 'welcome':
      content = renderWelcome();
      break;
    case 'instructions':
      content = renderInstructions();
      break;
    case 'reader':
      content = state.reviewMode ? renderReviewReader() : renderSectionReader();
      break;
    case 'socratic':
      content = renderSocratic();
      break;
    case 'quiz':
      content = renderQuiz();
      break;
    case 'report':
      content = renderReport();
      break;
    default:
      content = renderWelcome();
  }

  root.innerHTML = `
    <main class="app-shell">
      <div class="app-topbar">
        <div class="app-frame brand">
          <div class="brand-copy">
            <span class="brand-mark">קוראים אחרת</span>
            <span class="brand-sub">Socratic Reading Companion</span>
          </div>
          <a class="brand-status" href="https://h2eapps.com" target="_blank" rel="noopener noreferrer">Developed by H2eApps</a>
        </div>
      </div>
      <div class="app-frame">
        ${content}
      </div>
    </main>
  `;

  afterRender();
}

function afterRender() {
  // Protect socratic textareas
  const protectedAreas = root.querySelectorAll('textarea[data-protected]');
  protectedAreas.forEach(function (textarea) {
    textarea.addEventListener('paste', function (e) { e.preventDefault(); });
    textarea.addEventListener('copy', function (e) { e.preventDefault(); });
    textarea.addEventListener('cut', function (e) { e.preventDefault(); });
    textarea.addEventListener('drop', function (e) { e.preventDefault(); });
  });
}

function decodeBase64Utf8(encoded) {
  const binary = atob(encoded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new TextDecoder('utf-8').decode(bytes);
}

/* ===================================================================
   WELCOME SCREEN
   =================================================================== */

function renderWelcome() {
  const meta = articleData.meta;
  const isPromptOpen = state.welcomeResource === 'prompt';
  const isReadmeOpen = state.welcomeResource === 'readme';
  let resourcePanel = '';

  if (isPromptOpen || isReadmeOpen) {
    const resourceTitle = isPromptOpen
      ? 'העתיקו את הפרומפט למודל השפה המועדף עליכם'
      : 'README-v2: מידע נוסף על הפיילוט';
    const resourceText = isPromptOpen ? WELCOME_RESOURCES.prompt : WELCOME_RESOURCES.readme;
    const resourceDir = isPromptOpen ? 'ltr' : 'rtl';

    resourcePanel = `
      <section class="resource-panel">
        <div class="resource-panel-head">
          <div>
            <div class="resource-panel-kicker">${isPromptOpen ? 'פרומפט' : 'README'}</div>
            <h3 class="resource-panel-title">${resourceTitle}</h3>
          </div>
          <div class="resource-panel-actions">
            ${isPromptOpen ? '<button class="btn btn-secondary btn-small" data-action="copy-welcome-resource">העתקה</button>' : ''}
            <button class="btn btn-secondary btn-small" data-action="close-welcome-resource">סגירה</button>
          </div>
        </div>
        <textarea
          class="resource-textbox ${isPromptOpen ? 'resource-textbox-ltr' : 'resource-textbox-rtl'}"
          dir="${resourceDir}"
          readonly
        >${escapeHtml(resourceText)}</textarea>
      </section>
    `;
  }

  return `
    <section class="screen">
      <p class="subtitle">
        זהו כלי קריאה שמאט בכוונה את המפגש עם המאמר: קודם קוראים ומסמנים מה במשפטים עובד כטענה, ראיה, או הסתייגות; אחר כך בודקים את הסימון, עוברים לכתיבה סוקרטית קצרה, ולבסוף גם עונים על מבחן קצר.
        הרעיון הפדגוגי הוא ללמוד לא רק על מה המאמר, אלא איך טיעון אקדמי בנוי מבפנים ואיך הטענות שלו מחזיקות יחד לאורך הקריאה כולה.
      </p>

      <div class="meta-grid">
        <div class="meta-item">
          <div class="meta-label">מאמר</div>
          <div class="inline-ltr">${escapeHtml(meta.title)}</div>
        </div>
        <div class="meta-item">
          <div class="meta-label">כותבים</div>
          <div class="inline-ltr">${escapeHtml(meta.author)}</div>
        </div>
        <div class="meta-item">
          <div class="meta-label">מקור</div>
          <div class="inline-ltr">${escapeHtml(meta.source)}, ${escapeHtml(String(meta.year))}</div>
        </div>
        <div class="meta-item">
          <div class="meta-label">DOI</div>
          <div class="inline-ltr">${escapeHtml(meta.doi)}</div>
        </div>
      </div>

      <div class="form-grid">
        <div>
          <label for="student-name">שם (אופציונלי)</label>
          <input id="student-name" value="${escapeHtml(state.student.name)}" placeholder="שם פרטי ומשפחה" />
        </div>
        <div>
          <label for="student-id">תעודת זהות / מזהה (אופציונלי)</label>
          <input id="student-id" value="${escapeHtml(state.student.id)}" placeholder="מספר מזהה" />
        </div>
      </div>

      <div class="actions">
        <button class="btn btn-primary" data-action="to-instructions">בואו נתחיל</button>
      </div>

      <div class="welcome-resource-actions">
        <button class="btn btn-secondary" data-action="open-welcome-prompt">להכנת מאמר קריאה מודרכת משלכם</button>
        <button class="btn btn-secondary" data-action="open-welcome-readme">למידע נוסף</button>
      </div>

      ${resourcePanel}
    </section>
  `;
}

/* ===================================================================
   INSTRUCTIONS SCREEN
   =================================================================== */

function renderInstructions() {
  return `
    <section class="screen">
      <h2>איך קוראים כאן?</h2>

      <div class="instructions-steps">
        <div class="step-item">
          <span class="step-number">1</span>
          <span>קראו כל פסקה באנגלית. אם צריך, פתחו תרגום.</span>
        </div>

        <div class="step-item">
          <span class="step-number">2</span>
          <span>לחצו על משפט רלוונטי כדי לפתוח תפריט סימון, ואז בחרו אם הוא טענה, ראיה, או הסתייגות.</span>
        </div>
      </div>

      <div class="instructions-grid">
        ${renderCategoryCard('claim')}
        ${renderCategoryCard('evidence')}
        ${renderCategoryCard('hedging')}
      </div>

      <div class="note">
        לא כל משפט הוא טענה, ראיה או הסתייגות.
        חלק מהמשפטים הם רקע, הקשר, או מעבר.
        אם משפט לא נראה לכם מובהק — אל תסמנו אותו.
      </div>

      <div class="instructions-steps">
        <div class="step-item">
          <span class="step-number">3</span>
          <span>בסוף כל חלק תבדקו את עצמכם, תקבלו הסברים על הסימונים, ואז תעברו לשאלת כתיבה. כתבו בעצמכם. אי אפשר להדביק.</span>
        </div>

        <div class="step-item">
          <span class="step-number">4</span>
          <span>אחרי כל חלקי המאמר מחכה מבחן קצר, ובסיום תקבלו דוח מסכם עם ציוני סימון, תשובות, ואפשרות לחזור למאמר עם הסברים.</span>
        </div>
      </div>

      <div class="actions">
        <button class="btn btn-primary" data-action="start-reader">הבנתי, בואו נקרא</button>
        <button class="btn btn-secondary" data-action="to-welcome">חזרה</button>
      </div>
    </section>
  `;
}

function renderCategoryCard(type) {
  const cat = CATEGORY_META[type];
  const desc = CATEGORY_DESCRIPTIONS[type];

  return `
    <article class="category-card">
      <div class="category-head">
        <span class="dot dot-${cat.key}"></span>
        <span>${cat.label}</span>
      </div>
      <p>${desc.description}</p>
      <div class="example-snippet" dir="ltr">
        <span class="highlight-inline highlight-${cat.key}">${escapeHtml(desc.example)}</span>
      </div>
    </article>
  `;
}

/* ===================================================================
   SECTION READER
   =================================================================== */

function getExplanationText(entry) {
  if (!entry) return '';
  return entry.fb || entry.feedbackMissed || entry.feedbackCorrect || '';
}

function getSentenceEvaluation(sentenceId) {
  const expected = tagKey[sentenceId] || null;
  const studentTag = state.tagsBySentence[sentenceId] || null;

  if (!expected) {
    if (!studentTag) return null;
    return { sentenceId: sentenceId, status: 'extra', expected: null, studentTag: studentTag, explanation: '' };
  }

  if (!studentTag) {
    return { sentenceId: sentenceId, status: 'missed', expected: expected, studentTag: null, explanation: getExplanationText(expected) };
  }

  if (studentTag === expected.type) {
    return { sentenceId: sentenceId, status: 'correct', expected: expected, studentTag: studentTag, explanation: getExplanationText(expected) };
  }

  return { sentenceId: sentenceId, status: 'wrongCategory', expected: expected, studentTag: studentTag, explanation: getExplanationText(expected) };
}

function getRequiredCategoriesForSection(section) {
  const present = { claim: false, evidence: false, hedging: false };

  section.paragraphs.forEach(function (para) {
    para.sentences.forEach(function (sent) {
      const expected = tagKey[sent.id];
      if (expected) present[expected.type] = true;
    });
  });

  return Object.keys(present).filter(function (type) { return present[type]; });
}

function canCheckSection(section) {
  const required = getRequiredCategoriesForSection(section);
  const counts = countTagsInSection(section);
  return required.length > 0 && required.every(function (type) { return counts[type] > 0; });
}

function renderSelfCheckFeedback(result) {
  if (!result) return '';

  let title = '';
  let detail = '';
  let className = '';

  if (result.status === 'correct') {
    title = '✓ ' + CATEGORY_META[result.expected.type].label;
    detail = result.explanation;
    className = 'sentence-feedback-correct';
  } else if (result.status === 'wrongCategory') {
    title = 'סימנתם כ' + CATEGORY_META[result.studentTag].label + ', אבל זו בעצם ' + CATEGORY_META[result.expected.type].label;
    detail = result.explanation;
    className = 'sentence-feedback-wrong';
  } else if (result.status === 'extra') {
    title = 'משפט רקע, לא טענה/ראיה/הסתייגות';
    detail = 'המשפט הזה אינו מסומן במפתח כמשפט בעל משקל טיעוני מרכזי.';
    className = 'sentence-feedback-extra';
  } else if (result.status === 'missed') {
    title = 'פספסתם ' + CATEGORY_META[result.expected.type].label;
    detail = result.explanation;
    className = 'sentence-feedback-missed';
  }

  return `
    <div class="sentence-feedback ${className}" dir="rtl">
      <div class="sentence-feedback-title">${escapeHtml(title)}</div>
      ${detail ? `<div class="sentence-feedback-body">${escapeHtml(detail)}</div>` : ''}
    </div>
  `;
}

function renderReviewExplanation(result) {
  if (!result || !result.expected) return '';

  let choiceLine = '';
  if (result.status === 'wrongCategory') {
    choiceLine = `<div class="review-explanation-line">סימנתם: ${escapeHtml(CATEGORY_META[result.studentTag].label)} | הצפוי: ${escapeHtml(CATEGORY_META[result.expected.type].label)}</div>`;
  } else if (result.status === 'correct') {
    choiceLine = `<div class="review-explanation-line">סימנתם נכון: ${escapeHtml(CATEGORY_META[result.expected.type].label)}</div>`;
  } else if (result.status === 'missed') {
    choiceLine = `<div class="review-explanation-line">לא סימנתם את המשפט הזה. הצפוי: ${escapeHtml(CATEGORY_META[result.expected.type].label)}</div>`;
  }

  return `
    <div class="review-explanation review-explanation-${result.expected.type}" dir="rtl">
      <div class="review-explanation-type">הסוג הצפוי: ${escapeHtml(CATEGORY_META[result.expected.type].label)}</div>
      ${choiceLine}
      <div class="review-explanation-body">${escapeHtml(result.explanation)}</div>
    </div>
  `;
}

function renderParagraph(para, options) {
  const translationOpen = !!state.translationOpen[para.id];
  const sectionChecked = !!options.sectionChecked;

  if (para.isBlockquote) {
    const text = para.sentences.map(function (s) { return escapeHtml(s.text); }).join(' ');
    return `
      <div class="paragraph-shell blockquote-shell">
        <blockquote class="blockquote-text" dir="ltr">${text}</blockquote>
        ${para.translationHe ? `
          <button class="btn-translation-toggle" data-action="toggle-translation" data-paragraph-id="${para.id}">
            ${translationOpen ? 'הסתר תרגום' : 'תרגום'}
          </button>
          ${translationOpen ? `<div class="translation-panel" dir="rtl">${escapeHtml(para.translationHe)}</div>` : ''}
        ` : ''}
      </div>
    `;
  }

  let sentencesHtml = '';

  for (let si = 0; si < para.sentences.length; si++) {
    const sent = para.sentences[si];
    const studentTag = state.tagsBySentence[sent.id] || null;
    const evaluation = getSentenceEvaluation(sent.id);
    const keyEntry = tagKey[sent.id] || null;
    const isReviewMode = !!options.reviewMode;
    const isActiveReview = state.activeReviewSentenceId === sent.id;
    const isPickerOpen = !isReviewMode && !sectionChecked && state.activePickerSentenceId === sent.id;

    let sentenceClass = 'sentence';
    let actionAttr = '';
    let clickable = false;
    let extraBadge = '';

    if (isReviewMode) {
      if (keyEntry) {
        clickable = true;
        actionAttr = 'data-action="review-sentence"';

        if (evaluation && evaluation.status === 'correct') {
          sentenceClass += ' sentence-' + keyEntry.type;
        } else if (evaluation && evaluation.status === 'missed') {
          sentenceClass += ' sentence-' + keyEntry.type + ' sentence-dashed';
        } else if (evaluation && evaluation.status === 'wrongCategory') {
          sentenceClass += ' sentence-' + evaluation.studentTag + ' sentence-review-wrong';
          extraBadge = `<div class="review-expected-tag ${keyEntry.type}">צפוי: ${CATEGORY_META[keyEntry.type].label}</div>`;
        } else {
          sentenceClass += ' sentence-' + keyEntry.type + ' sentence-dashed';
        }
      } else {
        sentenceClass += ' sentence-muted';
      }
    } else {
      if (!sectionChecked) {
        clickable = true;
        actionAttr = 'data-action="sentence-click"';
      }

      if (studentTag) {
        sentenceClass += ' sentence-' + studentTag;
      }

      if (sectionChecked && evaluation) {
        if (evaluation.status === 'missed' && evaluation.expected) {
          sentenceClass += ' sentence-' + evaluation.expected.type + ' sentence-dashed';
        } else if (evaluation.status === 'extra') {
          sentenceClass += ' sentence-extra';
        } else if (evaluation.status === 'wrongCategory') {
          sentenceClass += ' sentence-review-wrong';
        }
      }
    }

    if (!clickable) {
      sentenceClass += ' sentence-static';
    }

    const tagLabel = studentTag && !(isReviewMode && evaluation && evaluation.status === 'wrongCategory')
      ? `<span class="tag-label ${studentTag}">${CATEGORY_META[studentTag].label}</span>`
      : '';

    const pickerHtml = isPickerOpen ? `
      <div class="sentence-picker" dir="rtl">
        ${['claim', 'evidence', 'hedging'].map(function (type) {
          const isActive = studentTag === type;
          return `<button class="picker-btn picker-${type}${isActive ? ' picker-active' : ''}" data-action="apply-tag" data-sentence-id="${sent.id}" data-tag-type="${type}">
            <span class="picker-dot"></span>
            <span>${CATEGORY_META[type].label}</span>
          </button>`;
        }).join('')}
        <button class="picker-btn picker-remove" data-action="clear-tag" data-sentence-id="${sent.id}">הסר</button>
      </div>
    ` : '';

    const selfCheckFeedback = sectionChecked && evaluation ? renderSelfCheckFeedback(evaluation) : '';
    const reviewFeedback = isReviewMode && keyEntry && isActiveReview ? renderReviewExplanation(evaluation || getSentenceEvaluation(sent.id)) : '';

    sentencesHtml += `
      <div class="sentence-unit">
        <span class="${sentenceClass}" ${clickable ? actionAttr : ''} data-sentence-id="${sent.id}">${escapeHtml(sent.text)}</span>
        ${tagLabel}
        ${pickerHtml}
        ${extraBadge}
        ${selfCheckFeedback}
        ${reviewFeedback}
      </div>
    `;
  }

  return `
    <div class="paragraph-shell">
      <div class="paragraph-header">
        <button class="btn-translation-toggle" data-action="toggle-translation" data-paragraph-id="${para.id}">
          ${translationOpen ? 'הסתר תרגום' : 'תרגום'}
        </button>
      </div>
      <div class="paragraph-text no-select" dir="ltr">${sentencesHtml}</div>
      ${translationOpen ? `<div class="translation-panel" dir="rtl">${escapeHtml(para.translationHe)}</div>` : ''}
    </div>
  `;
}

function renderSectionReader() {
  const section = getCurrentSection();
  const totalSections = articleData.sections.length;
  const sectionNum = state.currentSectionIndex + 1;
  const progressPct = (sectionNum / totalSections) * 100;
  const counts = countTagsInSection(section);
  const required = getRequiredCategoriesForSection(section);
  const canCheck = canCheckSection(section);
  const isChecked = !!state.checkedSections[section.id];

  let paragraphsHtml = '';
  for (let pi = 0; pi < section.paragraphs.length; pi++) {
    paragraphsHtml += renderParagraph(section.paragraphs[pi], { sectionChecked: isChecked, reviewMode: false });
  }

  const readinessText = required.map(function (type) {
    return (counts[type] > 0 ? '✓ ' : '○ ') + CATEGORY_META[type].label;
  }).join(' · ');

  return `
    <section class="screen">
      <div class="section-header">
        <h2 class="section-title-he">${escapeHtml(section.titleHe)}</h2>
        <div class="section-title-en inline-ltr">${escapeHtml(section.titleEn)}</div>
      </div>

      <div class="reader-header">
        <div class="pill">חלק ${sectionNum} מתוך ${totalSections}: ${escapeHtml(section.titleHe)}</div>
      </div>

      <div class="status-bar">
        <div class="counts">
          סימנתם: ${counts.claim} טענות · ${counts.evidence} ראיות · ${counts.hedging} הסתייגויות
        </div>
      </div>

      <div class="progress-wrap">
        <div class="progress-line" aria-label="progress">
          <div class="progress-fill" style="width:${progressPct.toFixed(2)}%"></div>
        </div>
        <div class="progress-text">חלק ${sectionNum} מתוך ${totalSections}</div>
      </div>

      ${paragraphsHtml}

      ${state.inlineNotice ? `<div class="inline-notice">${escapeHtml(state.inlineNotice)}</div>` : ''}

      <div class="check-panel">
        <div class="check-panel-text">
          ${isChecked ? 'בדקתם את החלק הזה. הסימונים ננעלו ואפשר לעבור לשאלת הכתיבה.' : 'כדי לבדוק תשובות, סמנו לפחות משפט אחד בכל סוג שמופיע בחלק הזה.'}
        </div>
        <div class="check-panel-status">${escapeHtml(readinessText)}</div>
        <div class="actions">
          <button class="btn btn-secondary${canCheck || isChecked ? '' : ' btn-disabled'}" data-action="self-check-section" ${canCheck || isChecked ? '' : 'disabled'}>${isChecked ? '✓ נבדק' : 'בדקו תשובות'}</button>
          <button class="btn btn-primary${isChecked ? '' : ' btn-disabled'}" data-action="continue-section" ${isChecked ? '' : 'disabled'}>המשך</button>
        </div>
      </div>
    </section>
  `;
}

function renderReviewReader() {
  let sectionsHtml = '';

  for (let si = 0; si < articleData.sections.length; si++) {
    const section = articleData.sections[si];
    let paragraphsHtml = '';

    for (let pi = 0; pi < section.paragraphs.length; pi++) {
      paragraphsHtml += renderParagraph(section.paragraphs[pi], { sectionChecked: false, reviewMode: true });
    }

    sectionsHtml += `
      <section class="review-section">
        <div class="section-header">
          <h2 class="section-title-he">${escapeHtml(section.titleHe)}</h2>
          <div class="section-title-en inline-ltr">${escapeHtml(section.titleEn)}</div>
        </div>
        ${paragraphsHtml}
      </section>
    `;
  }

  return `
    <section class="screen">
      <div class="section-header">
        <h2 class="section-title-he">חזרו למאמר עם הסברים</h2>
        <div class="section-title-en inline-ltr">Review Mode</div>
      </div>
      <div class="note">
        כל המשפטים שמופיעים במפתח מסומנים כאן. לחצו על משפט כדי לפתוח את ההסבר. משפטי רקע שלא נבדקים מוצגים באפור.
      </div>
      <div class="actions" style="margin-bottom:16px;">
        <button class="btn btn-secondary" data-action="back-to-report">חזרה לדוח</button>
      </div>
      ${sectionsHtml}
    </section>
  `;
}

/* ===================================================================
   SOCRATIC SCREEN
   =================================================================== */

function renderSocratic() {
  const section = getCurrentSection();
  const question = section.socraticQuestion;

  if (!question) {
    advanceFromSocratic();
    return '<section class="screen"><p>ממשיכים...</p></section>';
  }

  const answer = state.socraticAnswers[question.id] || '';
  const hintOpen = !!state.socraticHintOpen[question.id];
  const charCount = answer.length;
  const minChars = question.minChars || 50;
  const canSubmit = charCount >= minChars;

  const showFrictionBanner = !state.frictionBannerShown;

  return `
    <section class="screen">
      <div class="section-header">
        <h2 class="section-title-he">${escapeHtml(section.titleHe)}</h2>
        <div class="section-title-en inline-ltr">${escapeHtml(section.titleEn)}</div>
      </div>

      <div class="socratic-card">
        <div class="socratic-label">שאלה לכתיבה</div>
        <p class="socratic-question-text">${escapeHtml(question.text)}</p>

        <button class="btn btn-secondary btn-hint" data-action="toggle-hint" data-question-id="${question.id}">
          ${hintOpen ? 'הסתר רמז' : 'רמז'}
        </button>

        ${hintOpen ? `<div class="hint-panel">${escapeHtml(question.hint)}</div>` : ''}

        <textarea
          data-protected="true"
          data-question-id="${question.id}"
          data-input-type="socratic"
          class="socratic-textarea"
          rows="5"
          placeholder="כתבו את תשובתכם כאן..."
        >${escapeHtml(answer)}</textarea>

        <div class="char-counter ${canSubmit ? 'char-ok' : ''}">${charCount}/${minChars}</div>

        ${showFrictionBanner ? `
          <div class="friction-banner">
            הכתיבה בכלי זה היא ידנית בלבד — החיכוך הוא חלק מהלמידה
          </div>
        ` : ''}
      </div>

      <div class="actions" style="margin-top:16px;">
        <button class="btn btn-secondary" data-action="back-to-section">
          חזרה לטקסט
        </button>
        <button class="btn btn-primary${canSubmit ? '' : ' btn-disabled'}" data-action="submit-socratic" data-question-id="${question.id}" ${canSubmit ? '' : 'disabled'}>
          שלחו והמשיכו
        </button>
      </div>
    </section>
  `;
}

/* ===================================================================
   QUIZ SCREEN
   =================================================================== */

function renderQuiz() {
  let questionsHtml = '';

  for (let qi = 0; qi < quizQuestions.length; qi++) {
    const q = quizQuestions[qi];

    if (q.type === 'multiple_choice') {
      let optionsHtml = '';
      for (let oi = 0; oi < q.options.length; oi++) {
        const opt = q.options[oi];
        const checked = state.quizAnswers[q.id] === opt.id ? 'checked' : '';
        optionsHtml += `
          <label class="quiz-option">
            <input type="radio" name="${q.id}" value="${opt.id}" ${checked}
              data-action="quiz-select" data-question-id="${q.id}" data-option-id="${opt.id}" />
            <span>${escapeHtml(opt.text)}</span>
          </label>
        `;
      }

      questionsHtml += `
        <div class="quiz-question-card">
          <div class="quiz-question-num">שאלה ${qi + 1}</div>
          <p class="quiz-question-text">${escapeHtml(q.text)}</p>
          <div class="quiz-options">${optionsHtml}</div>
        </div>
      `;
    } else if (q.type === 'true_false_justify') {
      const currentAnswer = state.quizAnswers[q.id];
      const hasAnswer = currentAnswer === true || currentAnswer === false;
      const justification = state.quizJustifications[q.id] || '';
      const hint = q.justificationHint || '';

      questionsHtml += `
        <div class="quiz-question-card">
          <div class="quiz-question-num">שאלה ${qi + 1}</div>
          <p class="quiz-question-text">${escapeHtml(q.text)}</p>
          <div class="quiz-tf-buttons">
            <button class="btn ${currentAnswer === true ? 'btn-primary' : 'btn-secondary'}"
              data-action="quiz-tf" data-question-id="${q.id}" data-tf-value="true">נכון</button>
            <button class="btn ${currentAnswer === false ? 'btn-primary' : 'btn-secondary'}"
              data-action="quiz-tf" data-question-id="${q.id}" data-tf-value="false">לא נכון</button>
          </div>
          ${hasAnswer ? `
            <div class="quiz-justify-section">
              <label>נמקו בקצרה:</label>
              ${hint ? `<div class="quiz-justify-hint">${escapeHtml(hint)}</div>` : ''}
              <textarea
                data-protected="true"
                data-question-id="${q.id}"
                data-input-type="quiz-justification"
                class="socratic-textarea"
                rows="3"
                placeholder="הסבירו למה..."
              >${escapeHtml(justification)}</textarea>
            </div>
          ` : ''}
        </div>
      `;
    }
  }

  const allAnswered = quizQuestions.every(function (q) {
    if (q.type === 'multiple_choice') {
      return !!state.quizAnswers[q.id];
    }
    if (q.type === 'true_false_justify') {
      const hasAnswer = state.quizAnswers[q.id] === true || state.quizAnswers[q.id] === false;
      const hasJustification = (state.quizJustifications[q.id] || '').trim().length > 0;
      return hasAnswer && hasJustification;
    }
    return false;
  });

  return `
    <section class="screen">
      <h2>מבחן קצר</h2>
      <p class="subtitle">ענו על השאלות הבאות על סמך המאמר.</p>

      ${questionsHtml}

      <div class="actions" style="margin-top:16px;">
        <button class="btn btn-primary${allAnswered ? '' : ' btn-disabled'}" data-action="submit-quiz" ${allAnswered ? '' : 'disabled'}>
          סיימו ועברו לסיכום
        </button>
      </div>
    </section>
  `;
}

/* ===================================================================
   REPORT SCREEN
   =================================================================== */

function renderReport() {
  const tagging = computeTaggingResults();
  const totalPct = tagging.maxPoints > 0 ? Math.round((tagging.totalPoints / tagging.maxPoints) * 100) : 0;
  const tip = buildSummaryTip(tagging.categoryPoints);

  // Quiz scoring
  const quizResults = computeQuizResults();

  // Stats
  const totalReadingTime = computeTotalReadingTime();
  const translationsOpenedCount = Object.keys(state.translationViewed).length;
  const totalParagraphs = articleData.sections.reduce(function (sum, s) { return sum + s.paragraphs.length; }, 0);

  // Per-section tagging detail
  let sectionDetailHtml = '';
  for (let si = 0; si < articleData.sections.length; si++) {
    const section = articleData.sections[si];
    const sectionResults = getSectionTaggingResults(section, tagging.results);
    const sectionMax = sectionResults.max;
    const sectionEarned = sectionResults.earned;
    const sectionPct = sectionMax > 0 ? Math.round((sectionEarned / sectionMax) * 100) : 0;

    let itemsHtml = '';
    for (let ri = 0; ri < sectionResults.items.length; ri++) {
      const item = sectionResults.items[ri];
      const sentText = getSentenceTextById(item.sentenceId);
      const status = STATUS_META[item.status];

      let feedbackLine = '';
      if (item.status === 'correct' && item.expected) {
        feedbackLine = `<div class="feedback-row">סימנתם: ${CATEGORY_META[item.studentTag].label}. נכון.</div>`;
        if (item.expected.feedbackCorrect) {
          feedbackLine += `<div class="feedback-row">${escapeHtml(item.expected.feedbackCorrect)}</div>`;
        }
      } else if (item.status === 'missed' && item.expected) {
        feedbackLine = `<div class="feedback-row">לא סומן</div>`;
        if (item.expected.feedbackMissed) {
          feedbackLine += `<div class="feedback-row">${escapeHtml(item.expected.feedbackMissed)}</div>`;
        }
      } else if (item.status === 'wrongCategory' && item.expected) {
        feedbackLine = `<div class="feedback-row">סימנתם כ${CATEGORY_META[item.studentTag].label} אבל זו בעצם ${CATEGORY_META[item.expected.type].label}</div>`;
        if (item.expected.feedbackMissed) {
          feedbackLine += `<div class="feedback-row">${escapeHtml(item.expected.feedbackMissed)}</div>`;
        }
      } else if (item.status === 'extra') {
        feedbackLine = `<div class="feedback-row">סימנתם: ${CATEGORY_META[item.studentTag].label}</div>`;
        feedbackLine += `<div class="feedback-row">המשפט הזה לא מכיל טענה, ראיה, או הסתייגות מרכזית בפסקה זו.</div>`;
      }

      itemsHtml += `
        <div class="feedback-card">
          <div class="feedback-top ${status.className}">
            <span>${status.symbol}</span>
            <span>${status.label}</span>
          </div>
          <div class="feedback-row inline-ltr" dir="ltr" style="font-family:Georgia,serif;font-size:14px;">"${escapeHtml(truncateText(sentText, 120))}"</div>
          ${feedbackLine}
        </div>
      `;
    }

    const isExpanded = !!state['detailOpen_' + section.id];

    sectionDetailHtml += `
      <div class="report-section-block">
        <button class="btn-section-toggle" data-action="toggle-detail" data-section-id="${section.id}">
          ${escapeHtml(section.titleHe)} — ${sectionEarned}/${sectionMax} נקודות (${sectionPct}%)
          <span class="toggle-arrow">${isExpanded ? '▲' : '▼'}</span>
        </button>
        ${isExpanded ? `<div class="report-section-detail">${itemsHtml}</div>` : ''}
      </div>
    `;
  }

  // Category progress bars
  let categoryBarsHtml = '';
  ['claim', 'evidence', 'hedging'].forEach(function (type) {
    const cp = tagging.categoryPoints[type];
    const pct = cp.max > 0 ? Math.round((cp.earned / cp.max) * 100) : 0;
    categoryBarsHtml += `
      <div class="summary-row">
        <div class="summary-label">
          <span><span class="dot dot-${type}"></span> ${CATEGORY_META[type].label}</span>
          <span>${cp.earned}/${cp.max} (${pct}%)</span>
        </div>
        <div class="summary-track">
          <div class="summary-fill" style="width:${pct}%; background:${CATEGORY_META[type].color};"></div>
        </div>
      </div>
    `;
  });

  // Socratic answers
  let socraticHtml = '';
  const answeredCount = articleData.sections.filter(function (section) {
    const sq = section.socraticQuestion;
    if (!sq) return false;
    const minChars = sq.minChars || 50;
    return (state.socraticAnswers[sq.id] || '').trim().length >= minChars;
  }).length;
  const totalQuestions = articleData.sections.filter(function (s) { return !!s.socraticQuestion; }).length;

  for (let si = 0; si < articleData.sections.length; si++) {
    const section = articleData.sections[si];
    const sq = section.socraticQuestion;
    if (!sq) continue;
    const answer = state.socraticAnswers[sq.id] || '';
    socraticHtml += `
      <div class="socratic-report-item">
        <div class="socratic-report-q">${escapeHtml(sq.text)}</div>
        <div class="socratic-report-a">${answer ? escapeHtml(answer) : '<em>לא נענתה</em>'}</div>
      </div>
    `;
  }

  // Quiz results
  let quizHtml = '';
  for (let qi = 0; qi < quizResults.items.length; qi++) {
    const qr = quizResults.items[qi];
    const statusClass = qr.correct ? 'status-correct' : 'status-missed';
    const statusSymbol = qr.correct ? '✓' : '✕';
    quizHtml += `
      <div class="quiz-report-item">
        <div class="feedback-top ${statusClass}">
          <span>${statusSymbol}</span>
          <span>${escapeHtml(qr.questionText)}</span>
        </div>
        <div class="feedback-row">תשובתכם: ${escapeHtml(qr.studentAnswerText)}</div>
        <div class="feedback-row">תשובה נכונה: ${escapeHtml(qr.correctAnswerText)}</div>
        ${qr.justification ? `<div class="feedback-row">נימוק: ${escapeHtml(qr.justification)}</div>` : ''}
      </div>
    `;
  }

  return `
    <section class="screen">
      <h2>סיכום קריאה מודרכת</h2>

      <div class="summary-box" style="margin-bottom:16px;">
        <p><strong>מאמר:</strong> <span class="inline-ltr">${escapeHtml(articleData.meta.title)}</span></p>
        <p><strong>כותבים:</strong> <span class="inline-ltr">${escapeHtml(articleData.meta.author)}</span></p>
        <p><strong>תאריך:</strong> ${escapeHtml(new Date().toLocaleString('he-IL'))}</p>
      </div>

      <h3>זיהוי טענות</h3>
      <div class="summary-box" style="margin-bottom:12px;">
        <p><strong>ציון:</strong> ${tagging.totalPoints}/${tagging.maxPoints} (${totalPct}%)</p>
      </div>

      <div class="summary-box" style="margin-bottom:12px;">
        ${categoryBarsHtml}
      </div>

      <div class="tip">${escapeHtml(tip)}</div>

      <h3>פירוט לפי חלק</h3>
      ${sectionDetailHtml}

      <h3 style="margin-top:20px;">תשובות לשאלות סוקרטיות</h3>
      <div class="summary-box" style="margin-bottom:12px;">
        <p>ענית על ${answeredCount} מתוך ${totalQuestions} שאלות</p>
      </div>
      ${socraticHtml}

      <h3 style="margin-top:20px;">מבחן קצר</h3>
      <div class="summary-box" style="margin-bottom:12px;">
        <p>${quizResults.correct}/${quizResults.total} תשובות נכונות</p>
      </div>
      ${quizHtml}

      <h3 style="margin-top:20px;">נתונים</h3>
      <div class="summary-box" style="margin-bottom:16px;">
        <p>זמן קריאה: ${formatDuration(totalReadingTime)}</p>
        <p>תרגומים שנפתחו: ${translationsOpenedCount} מתוך ${totalParagraphs} פסקאות</p>
      </div>

      <div class="actions">
        <button class="btn btn-secondary" data-action="review-article">חזרו למאמר עם הסברים</button>
        <button class="btn btn-primary" data-action="download-report">הורד דוח</button>
        <button class="btn btn-secondary" data-action="restart">התחל מחדש</button>
      </div>
    </section>
  `;
}

/* ===================================================================
   EVENT HANDLER
   =================================================================== */

function handleRootClick(event) {
  const actionTarget = event.target.closest('[data-action]');
  if (!actionTarget) {
    if (state.activePickerSentenceId) {
      state.activePickerSentenceId = null;
      render();
    }
    return;
  }

  const action = actionTarget.dataset.action;

  if (action === 'to-instructions') {
    state.student.name = readInputValue('student-name');
    state.student.id = readInputValue('student-id');
    state.phase = 'instructions';
    state.welcomeResource = '';
    scrollToTop();
    render();
    return;
  }

  if (action === 'to-welcome') {
    state.phase = 'welcome';
    state.activePickerSentenceId = null;
    scrollToTop();
    render();
    return;
  }

  if (action === 'open-welcome-prompt') {
    state.welcomeResource = 'prompt';
    render();
    return;
  }

  if (action === 'open-welcome-readme') {
    state.welcomeResource = 'readme';
    render();
    return;
  }

  if (action === 'close-welcome-resource') {
    state.welcomeResource = '';
    render();
    return;
  }

  if (action === 'copy-welcome-resource') {
    copyTextToClipboard(WELCOME_RESOURCES.prompt);
    return;
  }

  if (action === 'start-reader') {
    state.phase = 'reader';
    state.reviewMode = false;
    state.activeReviewSentenceId = null;
    state.activePickerSentenceId = null;
    state.currentSectionIndex = 0;
    state.sessionStartTime = Date.now();
    state.sectionStartTimes[getCurrentSection().id] = Date.now();
    scrollToTop();
    render();
    return;
  }

  if (action === 'toggle-translation') {
    const paraId = actionTarget.dataset.paragraphId;
    const current = !!state.translationOpen[paraId];
    state.translationOpen[paraId] = !current;
    if (!current) {
      state.translationViewed[paraId] = true;
    }
    render();
    return;
  }

  if (action === 'toggle-hint') {
    const qId = actionTarget.dataset.questionId;
    state.socraticHintOpen[qId] = !state.socraticHintOpen[qId];
    render();
    return;
  }

  if (action === 'continue-section') {
    if (!state.checkedSections[getCurrentSection().id]) {
      setInlineNotice('בדקו תשובות לפני שממשיכים לשאלת הכתיבה.');
      return;
    }
    // Record section end time for reader
    const section = getCurrentSection();
    state.sectionEndTimes[section.id] = Date.now();
    state.phase = 'socratic';
    state.activePickerSentenceId = null;
    scrollToTop();
    render();
    return;
  }

  if (action === 'submit-socratic') {
    const qId = actionTarget.dataset.questionId;
    // Save answer is already handled by input event
    // Mark friction banner as shown after first socratic
    state.frictionBannerShown = true;
    advanceFromSocratic();
    return;
  }

  if (action === 'back-to-section') {
    state.phase = 'reader';
    state.reviewMode = false;
    state.activeReviewSentenceId = null;
    state.activePickerSentenceId = null;
    scrollToTop();
    render();
    return;
  }

  if (action === 'submit-quiz') {
    state.phase = 'report';
    state.reviewMode = false;
    state.activeReviewSentenceId = null;
    state.activePickerSentenceId = null;
    scrollToTop();
    render();
    return;
  }

  if (action === 'self-check-section') {
    const section = getCurrentSection();
    if (!canCheckSection(section) && !state.checkedSections[section.id]) {
      setInlineNotice('צריך לפחות סימון אחד בכל סוג שמופיע בחלק הזה לפני הבדיקה.');
      return;
    }
    state.checkedSections[section.id] = true;
    state.activeReviewSentenceId = null;
    state.activePickerSentenceId = null;
    render();
    return;
  }

  if (action === 'download-report') {
    downloadReportHtml();
    return;
  }

  if (action === 'review-article') {
    state.phase = 'reader';
    state.reviewMode = true;
    state.activeReviewSentenceId = null;
    state.activePickerSentenceId = null;
    scrollToTop();
    render();
    return;
  }

  if (action === 'back-to-report') {
    state.phase = 'report';
    state.reviewMode = false;
    state.activeReviewSentenceId = null;
    state.activePickerSentenceId = null;
    scrollToTop();
    render();
    return;
  }

  if (action === 'restart') {
    restartSession();
    return;
  }

  if (action === 'toggle-detail') {
    const sectionId = actionTarget.dataset.sectionId;
    state['detailOpen_' + sectionId] = !state['detailOpen_' + sectionId];
    render();
    return;
  }

  if (action === 'sentence-click') {
    const sentenceId = actionTarget.dataset.sentenceId;
    handleSentenceClick(sentenceId);
    return;
  }

  if (action === 'apply-tag') {
    const sentenceId = actionTarget.dataset.sentenceId;
    const type = actionTarget.dataset.tagType;
    if (sentenceId && type) {
      state.tagsBySentence[sentenceId] = type;
      state.activePickerSentenceId = null;
      render();
    }
    return;
  }

  if (action === 'clear-tag') {
    const sentenceId = actionTarget.dataset.sentenceId;
    if (sentenceId) {
      delete state.tagsBySentence[sentenceId];
      state.activePickerSentenceId = null;
      render();
    }
    return;
  }

  if (action === 'review-sentence') {
    const sentenceId = actionTarget.dataset.sentenceId;
    if (!tagKey[sentenceId]) return;
    state.activeReviewSentenceId = state.activeReviewSentenceId === sentenceId ? null : sentenceId;
    render();
    return;
  }

  if (action === 'quiz-select') {
    // Handled via change event on radio, but also handle click
    const qId = actionTarget.dataset.questionId;
    const optId = actionTarget.dataset.optionId;
    if (qId && optId) {
      state.quizAnswers[qId] = optId;
      render();
    }
    return;
  }

  if (action === 'quiz-tf') {
    const qId = actionTarget.dataset.questionId;
    const val = actionTarget.dataset.tfValue;
    state.quizAnswers[qId] = val === 'true';
    render();
    return;
  }
}

function handleRootInput(event) {
  const target = event.target;
  if (!target || !target.dataset) return;

  if (target.dataset.inputType === 'socratic') {
    const qId = target.dataset.questionId;
    state.socraticAnswers[qId] = target.value;
    // Update char counter without full re-render
    const counter = target.parentElement.querySelector('.char-counter');
    if (counter) {
      const section = getCurrentSection();
      const question = section.socraticQuestion;
      const minChars = question ? (question.minChars || 50) : 50;
      const charCount = target.value.length;
      counter.textContent = charCount + '/' + minChars;
      counter.className = 'char-counter' + (charCount >= minChars ? ' char-ok' : '');
      // Toggle submit button
      const submitBtn = root.querySelector('[data-action="submit-socratic"]');
      if (submitBtn) {
        if (charCount >= minChars) {
          submitBtn.disabled = false;
          submitBtn.classList.remove('btn-disabled');
        } else {
          submitBtn.disabled = true;
          submitBtn.classList.add('btn-disabled');
        }
      }
    }
    return;
  }

  if (target.dataset.inputType === 'quiz-justification') {
    const qId = target.dataset.questionId;
    state.quizJustifications[qId] = target.value;
    return;
  }
}

function handleRootChange(event) {
  const target = event.target;
  if (!target) return;

  // Handle radio button selection for quiz multiple choice
  if (target.type === 'radio' && target.dataset.action === 'quiz-select') {
    const qId = target.dataset.questionId;
    const optId = target.dataset.optionId;
    if (qId && optId) {
      state.quizAnswers[qId] = optId;
      render();
    }
  }
}

/* ===================================================================
   SENTENCE CLICK HANDLER
   =================================================================== */

function handleSentenceClick(sentenceId) {
  if (state.reviewMode) return;
  const currentSection = getCurrentSection();
  if (currentSection && state.checkedSections[currentSection.id]) return;
  state.activePickerSentenceId = state.activePickerSentenceId === sentenceId ? null : sentenceId;
  render();
}

/* ===================================================================
   NAVIGATION
   =================================================================== */

function advanceFromSocratic() {
  const totalSections = articleData.sections.length;
  state.reviewMode = false;
  state.activeReviewSentenceId = null;
  state.activePickerSentenceId = null;

  if (state.currentSectionIndex < totalSections - 1) {
    state.currentSectionIndex += 1;
    state.phase = 'reader';
    const nextSection = getCurrentSection();
    state.sectionStartTimes[nextSection.id] = Date.now();
  } else {
    state.phase = 'quiz';
  }

  scrollToTop();
  render();
}

/* ===================================================================
   TAGGING RESULTS
   =================================================================== */

function computeTaggingResults() {
  const results = [];
  let totalPoints = 0;
  let maxPoints = 0;
  const categoryPoints = {
    claim: { earned: 0, max: 0 },
    evidence: { earned: 0, max: 0 },
    hedging: { earned: 0, max: 0 },
  };

  // For each sentence in tagKey
  Object.entries(tagKey).forEach(function (entry) {
    const sentenceId = entry[0];
    const expected = entry[1];
    maxPoints += 2;
    categoryPoints[expected.type].max += 2;
    const studentTag = state.tagsBySentence[sentenceId];

    if (!studentTag) {
      results.push({ sentenceId: sentenceId, status: 'missed', expected: expected, studentTag: null });
    } else if (studentTag === expected.type) {
      totalPoints += 2;
      categoryPoints[expected.type].earned += 2;
      results.push({ sentenceId: sentenceId, status: 'correct', expected: expected, studentTag: studentTag });
    } else {
      results.push({ sentenceId: sentenceId, status: 'wrongCategory', expected: expected, studentTag: studentTag });
    }
  });

  // Extra tags (student tagged but not in key)
  Object.entries(state.tagsBySentence).forEach(function (entry) {
    const sentenceId = entry[0];
    const tag = entry[1];
    if (!tagKey[sentenceId]) {
      results.push({ sentenceId: sentenceId, status: 'extra', expected: null, studentTag: tag });
    }
  });

  return { results: results, totalPoints: totalPoints, maxPoints: maxPoints, categoryPoints: categoryPoints };
}

function getSectionTaggingResults(section, allResults) {
  const sectionSentenceIds = {};
  section.paragraphs.forEach(function (para) {
    para.sentences.forEach(function (sent) {
      sectionSentenceIds[sent.id] = true;
    });
  });

  const items = allResults.filter(function (r) { return sectionSentenceIds[r.sentenceId]; });
  let earned = 0;
  let max = 0;

  items.forEach(function (item) {
    if (item.expected) {
      max += 2;
      if (item.status === 'correct') {
        earned += 2;
      }
    }
  });

  return { items: items, earned: earned, max: max };
}

/* ===================================================================
   QUIZ RESULTS
   =================================================================== */

function computeQuizResults() {
  const items = [];
  let correct = 0;

  for (let qi = 0; qi < quizQuestions.length; qi++) {
    const q = quizQuestions[qi];
    let isCorrect = false;
    let studentAnswerText = '';
    let correctAnswerText = '';
    let justification = '';

    if (q.type === 'multiple_choice') {
      const selectedId = state.quizAnswers[q.id];
      isCorrect = selectedId === q.correctId;
      const selectedOpt = q.options.find(function (o) { return o.id === selectedId; });
      const correctOpt = q.options.find(function (o) { return o.id === q.correctId; });
      studentAnswerText = selectedOpt ? selectedOpt.text : 'לא נענתה';
      correctAnswerText = correctOpt ? correctOpt.text : '';
    } else if (q.type === 'true_false_justify') {
      const answer = state.quizAnswers[q.id];
      isCorrect = answer === q.correctAnswer;
      studentAnswerText = answer === true ? 'נכון' : answer === false ? 'לא נכון' : 'לא נענתה';
      correctAnswerText = q.correctAnswer ? 'נכון' : 'לא נכון';
      justification = state.quizJustifications[q.id] || '';
    }

    if (isCorrect) correct++;

    items.push({
      questionText: q.text,
      correct: isCorrect,
      studentAnswerText: studentAnswerText,
      correctAnswerText: correctAnswerText,
      justification: justification,
    });
  }

  return { items: items, correct: correct, total: quizQuestions.length };
}

/* ===================================================================
   SUMMARY TIP
   =================================================================== */

function buildSummaryTip(categoryPoints) {
  const claimPct = categoryPoints.claim.max > 0 ? Math.round((categoryPoints.claim.earned / categoryPoints.claim.max) * 100) : 100;
  const evidencePct = categoryPoints.evidence.max > 0 ? Math.round((categoryPoints.evidence.earned / categoryPoints.evidence.max) * 100) : 100;
  const hedgingPct = categoryPoints.hedging.max > 0 ? Math.round((categoryPoints.hedging.earned / categoryPoints.hedging.max) * 100) : 100;

  if (claimPct >= 70 && evidencePct >= 70 && hedgingPct >= 70) {
    return 'מעולה. זיהיתם היטב טענות, ראיות והסתייגויות לאורך הטקסט. המשיכו לשמור על הדיוק הזה גם במאמרים חדשים.';
  }

  if (hedgingPct < 50) {
    return 'נראה שהכי מאתגר היה לזהות הסתייגויות. חפשו ביטויים כמו "in our view", "might", "plausible", "at least in principle" — הם מסמנים שהכותב מרכך או מגביל את הטענה.';
  }

  if (evidencePct < 50) {
    return 'כדאי לשים לב יותר לראיות: ציטוטים, דוגמאות, מקורות ותיאור מנגנונים הם בדרך כלל התמיכה לטענה.';
  }

  if (claimPct < 50) {
    return 'חזקו זיהוי טענות: חפשו את המשפט שאפשר להסכים או להתנגד לו. תיאור בלבד הוא לא בהכרח טענה.';
  }

  return 'יש בסיס טוב. נסו לדייק יותר בזיהוי הקטגוריות כדי לשפר את הציון.';
}

/* ===================================================================
   REPORT DOWNLOAD
   =================================================================== */

function downloadReportHtml() {
  const tagging = computeTaggingResults();
  const totalPct = tagging.maxPoints > 0 ? Math.round((tagging.totalPoints / tagging.maxPoints) * 100) : 0;
  const quizResults = computeQuizResults();
  const now = new Date();
  const timestamp = now.toLocaleString('he-IL');
  const totalReadingTime = computeTotalReadingTime();
  const translationsOpenedCount = Object.keys(state.translationViewed).length;
  const totalParagraphs = articleData.sections.reduce(function (sum, s) { return sum + s.paragraphs.length; }, 0);

  // Build per-section tagging detail
  let sectionDetailHtml = '';
  for (let si = 0; si < articleData.sections.length; si++) {
    const section = articleData.sections[si];
    const sectionResults = getSectionTaggingResults(section, tagging.results);
    const sectionPct = sectionResults.max > 0 ? Math.round((sectionResults.earned / sectionResults.max) * 100) : 0;

    let itemsHtml = '';
    for (let ri = 0; ri < sectionResults.items.length; ri++) {
      const item = sectionResults.items[ri];
      const sentText = getSentenceTextById(item.sentenceId);
      const status = STATUS_META[item.status];

      let feedbackText = '';
      if (item.status === 'correct' && item.expected) {
        feedbackText = 'סימנתם: ' + CATEGORY_META[item.studentTag].label + ' — נכון!';
        if (item.expected.feedbackCorrect) feedbackText += ' ' + item.expected.feedbackCorrect;
      } else if (item.status === 'missed' && item.expected) {
        feedbackText = 'לא סומן.';
        if (item.expected.feedbackMissed) feedbackText += ' ' + item.expected.feedbackMissed;
      } else if (item.status === 'wrongCategory' && item.expected) {
        feedbackText = 'סימנתם כ' + CATEGORY_META[item.studentTag].label + ' אבל זו בעצם ' + CATEGORY_META[item.expected.type].label + '.';
        if (item.expected.feedbackMissed) feedbackText += ' ' + item.expected.feedbackMissed;
      } else if (item.status === 'extra') {
        feedbackText = 'סימנתם: ' + CATEGORY_META[item.studentTag].label + '. המשפט הזה לא מכיל טענה, ראיה, או הסתייגות מרכזית.';
      }

      itemsHtml += `
        <tr>
          <td>${status.symbol} ${escapeHtml(status.label)}</td>
          <td style="direction:ltr;text-align:left;font-family:Georgia,serif;font-size:13px;">${escapeHtml(truncateText(sentText, 150))}</td>
          <td>${escapeHtml(feedbackText)}</td>
        </tr>
      `;
    }

    sectionDetailHtml += `
      <h3>${escapeHtml(section.titleHe)} — ${sectionResults.earned}/${sectionResults.max} (${sectionPct}%)</h3>
      <table>
        <thead><tr><th>סטטוס</th><th>משפט</th><th>משוב</th></tr></thead>
        <tbody>${itemsHtml}</tbody>
      </table>
    `;
  }

  // Socratic answers
  let socraticSectionsHtml = '';
  for (let si = 0; si < articleData.sections.length; si++) {
    const section = articleData.sections[si];
    const sq = section.socraticQuestion;
    if (!sq) continue;
    const answer = state.socraticAnswers[sq.id] || 'לא נענתה';
    socraticSectionsHtml += `
      <div class="box">
        <p><strong>${escapeHtml(sq.text)}</strong></p>
        <p>${escapeHtml(answer)}</p>
      </div>
    `;
  }

  // Quiz detail
  let quizDetailHtml = '';
  for (let qi = 0; qi < quizResults.items.length; qi++) {
    const qr = quizResults.items[qi];
    quizDetailHtml += `
      <div class="box">
        <p><strong>שאלה ${qi + 1}:</strong> ${escapeHtml(qr.questionText)}</p>
        <p>${qr.correct ? '✓' : '✕'} תשובתכם: ${escapeHtml(qr.studentAnswerText)}</p>
        <p>תשובה נכונה: ${escapeHtml(qr.correctAnswerText)}</p>
        ${qr.justification ? `<p>נימוק: ${escapeHtml(qr.justification)}</p>` : ''}
      </div>
    `;
  }

  // Category summary
  let categorySummaryHtml = '';
  ['claim', 'evidence', 'hedging'].forEach(function (type) {
    const cp = tagging.categoryPoints[type];
    const pct = cp.max > 0 ? Math.round((cp.earned / cp.max) * 100) : 0;
    categorySummaryHtml += `<p><strong>${CATEGORY_META[type].label}:</strong> ${cp.earned}/${cp.max} (${pct}%)</p>`;
  });

  const reportHtml = `<!doctype html>
<html lang="he" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <title>דוח קריאה מודרכת — קוראים אחרת</title>
  <style>
    html { direction: rtl; }
    body { direction: rtl; text-align: right; font-family: Heebo, Arial, sans-serif; line-height: 1.6; color: #2e281f; background: #f6f2e8; margin: 20px auto; max-width: 800px; padding: 0 12px; }
    h1, h2, h3 { margin: 16px 0 8px; }
    .box { border: 1px solid #d6cebf; border-radius: 10px; background: #faf6ee; padding: 12px; margin-bottom: 12px; }
    table { width: 100%; border-collapse: collapse; margin: 8px 0 16px; }
    th, td { border: 1px solid #d7cfbf; padding: 8px; vertical-align: top; text-align: right; font-size: 13px; }
    th { background: #f0e9dc; }
    .muted { color: #7b6d5b; }
    .inline-ltr { direction: ltr; text-align: left; unicode-bidi: isolate; font-family: Georgia, "Times New Roman", serif; }
    hr { border: none; border-top: 2px solid #e5dfd3; margin: 20px 0; }
  </style>
</head>
<body dir="rtl">
  <h1>דוח קריאה מודרכת — קוראים אחרת</h1>
  <div class="box">
    <p><strong>שם:</strong> ${escapeHtml(state.student.name || 'לא הוזן')}</p>
    <p><strong>מזהה:</strong> ${escapeHtml(state.student.id || 'לא הוזן')}</p>
    <p><strong>מאמר:</strong> <span class="inline-ltr">${escapeHtml(articleData.meta.title)}</span></p>
    <p><strong>כותבים:</strong> <span class="inline-ltr">${escapeHtml(articleData.meta.author)}</span></p>
    <p><strong>מקור:</strong> <span class="inline-ltr">${escapeHtml(articleData.meta.source)}, ${escapeHtml(String(articleData.meta.year))}</span></p>
    <p><strong>תאריך:</strong> ${escapeHtml(timestamp)}</p>
  </div>

  <hr />

  <h2>זיהוי טענות</h2>
  <div class="box">
    <p><strong>ציון כולל:</strong> ${tagging.totalPoints}/${tagging.maxPoints} (${totalPct}%)</p>
    ${categorySummaryHtml}
  </div>

  ${sectionDetailHtml}

  <hr />

  <h2>תשובות לשאלות סוקרטיות</h2>
  ${socraticSectionsHtml}

  <hr />

  <h2>מבחן קצר</h2>
  <div class="box">
    <p><strong>ציון:</strong> ${quizResults.correct}/${quizResults.total}</p>
  </div>
  ${quizDetailHtml}

  <hr />

  <h2>נתונים</h2>
  <div class="box">
    <p><strong>זמן קריאה:</strong> ${formatDuration(totalReadingTime)}</p>
    <p><strong>תרגומים שנפתחו:</strong> ${translationsOpenedCount} מתוך ${totalParagraphs} פסקאות</p>
  </div>

  <p class="muted">הדוח נוצר אוטומטית על ידי "קוראים אחרת" — Socratic Reading Companion.</p>
</body>
</html>`;

  const blob = new Blob([reportHtml], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'reading-report-' + formatDateForFilename(now) + '.html';
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

/* ===================================================================
   SESSION MANAGEMENT
   =================================================================== */

function restartSession() {
  state.phase = 'welcome';
  state.currentSectionIndex = 0;
  state.tagsBySentence = {};
  state.translationOpen = {};
  state.translationViewed = {};
  state.socraticAnswers = {};
  state.socraticHintOpen = {};
  state.quizAnswers = {};
  state.quizJustifications = {};
  state.sessionStartTime = null;
  state.sectionStartTimes = {};
  state.sectionEndTimes = {};
  state.inlineNotice = '';
  state.noticeTimerId = null;
  state.frictionBannerShown = false;
  state.checkedSections = {};
  state.reviewMode = false;
  state.activeReviewSentenceId = null;
  state.activePickerSentenceId = null;
  state.welcomeResource = '';

  // Clear detail toggles
  articleData.sections.forEach(function (s) {
    delete state['detailOpen_' + s.id];
  });

  clearSelection();
  scrollToTop();
  render();
}

function copyTextToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text)
      .then(function () {
        setInlineNotice('הפרומפט הועתק.');
      })
      .catch(function () {
        fallbackCopyText(text);
      });
    return;
  }
  fallbackCopyText(text);
}

function fallbackCopyText(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', 'readonly');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand('copy');
    setInlineNotice('הפרומפט הועתק.');
  } catch (error) {
    setInlineNotice('לא הצלחנו להעתיק אוטומטית. אפשר לסמן ולהעתיק ידנית.');
  }
  textarea.remove();
}

/* ===================================================================
   HELPERS
   =================================================================== */

function getCurrentSection() {
  return articleData.sections[state.currentSectionIndex];
}

function countTagsInSection(section) {
  const counts = { claim: 0, evidence: 0, hedging: 0 };
  section.paragraphs.forEach(function (para) {
    para.sentences.forEach(function (sent) {
      const tag = state.tagsBySentence[sent.id];
      if (tag && counts[tag] !== undefined) {
        counts[tag]++;
      }
    });
  });
  return counts;
}

function countSentencesInSection(section) {
  let count = 0;
  section.paragraphs.forEach(function (para) {
    if (!para.isBlockquote) {
      count += para.sentences.length;
    }
  });
  return count;
}

function getSentenceTextById(sentenceId) {
  for (let si = 0; si < articleData.sections.length; si++) {
    const section = articleData.sections[si];
    for (let pi = 0; pi < section.paragraphs.length; pi++) {
      const para = section.paragraphs[pi];
      for (let sei = 0; sei < para.sentences.length; sei++) {
        if (para.sentences[sei].id === sentenceId) {
          return para.sentences[sei].text;
        }
      }
    }
  }
  return '';
}

function truncateText(text, maxLen) {
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen) + '...';
}

function computeTotalReadingTime() {
  if (!state.sessionStartTime) return 0;
  return Math.round((Date.now() - state.sessionStartTime) / 1000);
}

function formatDuration(totalSeconds) {
  if (totalSeconds < 60) return totalSeconds + ' שניות';
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  if (seconds === 0) return minutes + ' דקות';
  return minutes + ' דקות ו-' + seconds + ' שניות';
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ===================================================================
   UTILITY FUNCTIONS (kept verbatim from v1)
   =================================================================== */

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

let idCounter = 0;

function makeId(prefix) {
  idCounter += 1;
  return `${prefix}-${idCounter}`;
}

function setInlineNotice(message) {
  state.inlineNotice = message;

  if (state.noticeTimerId) {
    clearTimeout(state.noticeTimerId);
  }

  state.noticeTimerId = setTimeout(function () {
    state.inlineNotice = '';
    state.noticeTimerId = null;
    render();
  }, 2600);

  render();
}

function formatDateForFilename(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');

  return `${year}${month}${day}-${hour}${minute}`;
}

function clearSelection() {
  const selection = window.getSelection();

  if (selection) {
    selection.removeAllRanges();
  }
}

function readInputValue(id) {
  const element = document.getElementById(id);
  return element ? element.value.trim() : '';
}

function isMobileViewport() {
  return window.matchMedia('(max-width: 768px)').matches;
}
