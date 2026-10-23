"use client";
export default function Contact() {
  return (
    <form action="/api/contact" method="post">
      <input type="text" name="prenom" required />
      <input type="email" name="email" required />
      <input type="tel" name="telephone" />
      <input type="date" name="naissance" />
      <textarea name="message" placeholder="Parle-nous de ta santé, tes blessures, ton poids" />
      <label><input type="checkbox" name="newsletter" defaultChecked /> Recevoir nos offres</label>
      <button type="submit">Envoyer</button>
    </form>
  );
}
