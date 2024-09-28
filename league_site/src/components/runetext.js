function getRuneText(rune, var1, var2, var3) {
    switch (rune) {
      case "Arcane Comet":
        return `Damage: ${var1} 💥`;
      case "Electrocute":
        return `Damage: ${var1} 💥`;
      case "Fleet Footwork":
        return `Total Healing: ${var1} 💖`;
      case "Conqueror":
        return `Total Healing: ${var1} 💖`;
      case "Press the Attack":
        return `Total Damage: ${var1} 💥<br />Bonus Damage: ${var2} 🎁<br />Expose Damage: ${var3} 🕵️‍♂️`;
      case "Dark Harvest":
        return `Total Damage: ${var1} 💥<br />Total Souls Harvested: ${var2} 👻`;
      case "Hail of Blades":
        return `Attacks made with extra attack speed: ${var1} ⚔️<br />Percentage of Hail attacks landed: ${parseInt(var2 * 100)}%`;
      case "Summon Aery":
        return `Total Damage: ${var1} 💥<br />Total Shield: ${var2} 🛡️`;
      case "Glacial Augment":
        return `Duration enemy champions slowed: ${var1}s 🐌<br />Damage reduced: ${var2} 📉`;
      case "Aftershock":
        return `Total Damage: ${var1} 💥<br />Total Damage Mitigated: ${var2} 📉`;
      case "Phase Rush":
        return `Total Activations: ${var1} 🏃`;
      case "Grasp of the Undying":
        return `Total Damage: ${var1} 💥<br />Total Healing: ${var2} 💖`;
      case "Guardian":
        return `Total Shielding Strength: ${var1} 🛡️`;
      case "First Strike":
        return `Total Damage: ${var1} 💥<br />Total Gold Earned: ${var2} 💰`;
      case "Unsealed Spellbook":
        return `Total Times rune was changed: ${var1}`;
      case "Absorb Life":
        return `Total Healing: ${var1} 💖`;
      case "Legend: Haste":
        return `Time Completed: ${var1} ⏰`;
      case "Last Stand":
        return `Total Bonus Damage: ${var1} 💥`;
      case "Manaflow Band":
        return `Total bonus Mana: ${var1} 💧<br />Total mana restored: ${var2} 🌧️`;
      case "Transcendence":
        return `Seconds refunded: ${var1} ⏰`;
      case "Sudden Impact":
        return `Bonus Damage: ${var1} 💥`;
      case "Eyeball Collection":
        return `Total Bonus AD/AP: ${var1} 💥`;
      case "Ultimate Hunter":
        return `Total Stacks: ${var1}`;
      case "Triumph":
        return `Total Health Restored: ${var1} 💖<br />Total bonus gold granted: ${var2} 💰`;
      case "Coup de Grace":
        return `Total Bonus Damage: ${var1} 💥`;
      case "Scorch":
        return `Total Bonus Damage: ${var1} 💥`;
      case "Presence of Mind":
        return `Resource Restored: ${var1} 💧`;
      case "Cut Down":
        return `Total Bonus Damage: ${var1} 💥`;
      case "Magical Footwear":
        return `Boots Arrival Time: ${var1} ⏰`;
      case "Biscuit Delivery":
        return `Biscuits Received: ${var1} 🍪`;
      case "Legend: Alacrity":
        return `Time Completed: ${var1} ⏰`;
      case "Overgrowth":
        return `Total Bonus Max Health: ${var1} 💚`;
      case "Conditioning":
        return `Percent of game active: ${var1}<br />Total Bonus Armor: ${var2} 🛡️<br />Total Bonus Magic Resist: ${var3} 🏰`;
      case "Legend: Bloodline":
        return `Time Completed: ${var1} ⏰`;
      case "Celerity":
        return `Extra Distance Travelled: ${var1} 📍`;
      case "Gathering Storm":
        return `Total Bonus AD/AP: ${var1} 💥`;
      case "Demolish":
        return `Total Bonus Damage: ${var1} 💥`;
      case "Approach Velocity":
        return `Time Spent Hasted: ${var1} ⏰`;
      case "Shield Bash":
        return `Total Damage: ${var1} 💥`;
      case "Second Wind":
        return `Total Healing: ${var1} 💖`;
      case "Cheap Shot":
        return `Total Damage: ${var1} 💥`;
      case "Taste of Blood":
        return `Total Healing: ${var1} 💖`;
      case "Treasure Hunter":
        return `Gold Collected: ${var1} 💰<br />Total Stacks: ${var2}`;
      case "Zombie Ward":
        return `Wards spawned: ${var1} 👁️<br />Adaptive Force Gained: ${var2} 💥`;
      case "Hextech Flashtraption":
        return `Times Hexflashed: ${var1}`;
      case "Relentless Hunter":
        return `Total Stacks: ${var1}<br />${var2}% Move Speed Increase 👢`;
      case "Water Walking":
        return `Total time active: ${var1} ⏰`;
      case "Nullifying Orb":
        return `Total Shield Granted: ${var1} 🛡️`;
      case "Absolute Focus":
        return `Total time active: ${var1} ⏰`;
      case "Ghost Poro":
        return `Ghost Poros Spawned: ${var1}<br />Enemies Spotted: ${var2} 👁️`;
      case "Nimbus Cloak":
        return `Times activated: ${var1}`;
      case "Font of Life":
        return `Total Ally Healing: ${var1} 💖`;
      case "Bone Plating":
        return `Total Damage Blocked: ${var1} 🛡️`;
      case "Revitalize":
        return `Bonus Healing: ${var1} 💖<br />Bonus Shielding: ${var2} 🛡️`;
      case "Cash Back":
        return `Gold Gained: ${var1} 💰`;
      case "Triple Tonic":
        return `Items Gained: ${var1}`;
      case "Unflinching":
        return `Seconds in combat with bonus resistances: ${var1} ⏰`;
      case "Time Warp Tonic":
        return `Total Immediate Health Restored: ${var1} 💖`;
      case "Jack of All Trades":
        return `Bonus stats gained: ${var1}`;
      default:
        return `${rune} - No additional information available`;
    }
}
export default getRuneText;
