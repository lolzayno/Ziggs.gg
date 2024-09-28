function getRuneTextAverage(rune, var1, var2, var3) {
    switch (rune) {
      case "Arcane Comet":
        return `Average Damage: ${var1} 💥`;
      case "Electrocute":
        return `Average Damage: ${var1} 💥`;
      case "Fleet Footwork":
        return `Average Total Healing: ${var1} 💖`;
      case "Conqueror":
        return `Average Total Healing: ${var1} 💖`;
      case "Press the Attack":
        return `Average Total Damage: ${var1} 💥<br />Average Bonus Damage: ${var2} 🎁<br />Average Expose Damage: ${var3} 🕵️‍♂️`;
      case "Dark Harvest":
        return `Average Total Damage: ${var1} 💥<br />Average Total Souls Harvested: ${var2} 👻`;
      case "Hail of Blades":
        return `Average Attacks made with extra attack speed: ${var1} ⚔️<br />Average Percentage of Hail attacks landed: ${parseInt(var2 * 100)}%`;
      case "Summon Aery":
        return `Average Total Damage: ${var1} 💥<br />Average Total Shield: ${var2} 🛡️`;
      case "Glacial Augment":
        return `Average Duration enemy champions slowed: ${var1}s 🐌<br />Average Damage reduced: ${var2} 📉`;
      case "Aftershock":
        return `Average Total Damage: ${var1} 💥<br />Average Total Damage Mitigated: ${var2} 📉`;
      case "Phase Rush":
        return `Average Total Activations: ${var1} 🏃`;
      case "Grasp of the Undying":
        return `Average Total Damage: ${var1} 💥<br />Average Total Healing: ${var2} 💖`;
      case "Guardian":
        return `Average Total Shielding Strength: ${var1} 🛡️`;
      case "First Strike":
        return `Average Total Damage: ${var1} 💥<br />Average Total Gold Earned: ${var2} 💰`;
      case "Unsealed Spellbook":
        return `Average Total Times rune was changed: ${var1}`;
      case "Absorb Life":
        return `Average Total Healing: ${var1} 💖`;
      case "Legend: Haste":
        return `Average Time Completed: ${var1} ⏰`;
      case "Last Stand":
        return `Average Total Bonus Damage: ${var1} 💥`;
      case "Manaflow Band":
        return `Average Total bonus Mana: ${var1} 💧<br />Average Total mana restored: ${var2} 🌧️`;
      case "Transcendence":
        return `Average Seconds refunded: ${var1} ⏰`;
      case "Sudden Impact":
        return `Average Bonus Damage: ${var1} 💥`;
      case "Eyeball Collection":
        return `Average Total Bonus AD/AP: ${var1} 💥`;
      case "Ultimate Hunter":
        return `Average Total Stacks: ${var1}`;
      case "Triumph":
        return `Average Total Health Restored: ${var1} 💖<br />Average Total bonus gold granted: ${var2} 💰`;
      case "Coup de Grace":
        return `Average Total Bonus Damage: ${var1} 💥`;
      case "Scorch":
        return `Average Total Bonus Damage: ${var1} 💥`;
      case "Presence of Mind":
        return `Average Resource Restored: ${var1} 💧`;
      case "Cut Down":
        return `Average Total Bonus Damage: ${var1} 💥`;
      case "Magical Footwear":
        return `Average Boots Arrival Time: ${var1} ⏰`;
      case "Biscuit Delivery":
        return `Average Biscuits Received: ${var1} 🍪`;
      case "Legend: Alacrity":
        return `Average Time Completed: ${var1} ⏰`;
      case "Overgrowth":
        return `Average Total Bonus Max Health: ${var1} 💚`;
      case "Conditioning":
        return `Average Percent of game active: ${var1}<br />Total Bonus Armor: ${var2} 🛡️<br />Average Total Bonus Magic Resist: ${var3} 🏰`;
      case "Legend: Bloodline":
        return `Average Time Completed: ${var1} ⏰`;
      case "Celerity":
        return `Average Extra Distance Travelled: ${var1} 📍`;
      case "Gathering Storm":
        return `Average Total Bonus AD/AP: ${var1} 💥`;
      case "Demolish":
        return `Average Total Bonus Damage: ${var1} 💥`;
      case "Approach Velocity":
        return `Average Time Spent Hasted: ${var1} ⏰`;
      case "Shield Bash":
        return `Average Total Damage: ${var1} 💥`;
      case "Second Wind":
        return `Average Total Healing: ${var1} 💖`;
      case "Cheap Shot":
        return `Average Total Damage: ${var1} 💥`;
      case "Taste of Blood":
        return `Average Total Healing: ${var1} 💖`;
      case "Treasure Hunter":
        return `Average Gold Collected: ${var1} 💰<br />Average Total Stacks: ${var2}`;
      case "Zombie Ward":
        return `Average Wards spawned: ${var1} 👁️<br />Average Adaptive Force Gained: ${var2} 💥`;
      case "Hextech Flashtraption":
        return `Average Times Hexflashed: ${var1}`;
      case "Relentless Hunter":
        return `Average Total Stacks: ${var1}<br />Average ${var2}% Move Speed Increase 👢`;
      case "Water Walking":
        return `Average Total time active: ${var1} ⏰`;
      case "Nullifying Orb":
        return `Average Total Shield Granted: ${var1} 🛡️`;
      case "Absolute Focus":
        return `Average Total time active: ${var1} ⏰`;
      case "Ghost Poro":
        return `Average Ghost Poros Spawned: ${var1}<br />Average Enemies Spotted: ${var2} 👁️`;
      case "Nimbus Cloak":
        return `Average Times activated: ${var1}`;
      case "Font of Life":
        return `Average Total Ally Healing: ${var1} 💖`;
      case "Bone Plating":
        return `Average Total Damage Blocked: ${var1} 🛡️`;
      case "Revitalize":
        return `Average Bonus Healing: ${var1} 💖<br />Bonus Shielding: ${var2} 🛡️`;
      case "Cash Back":
        return `Average Gold Gained: ${var1} 💰`;
      case "Triple Tonic":
        return `Average Items Gained: ${var1}`;
      case "Unflinching":
        return `Average Seconds in combat with bonus resistances: ${var1} ⏰`;
      case "Time Warp Tonic":
        return `Average Total Immediate Health Restored: ${var1} 💖`;
      case "Jack of All Trades":
        return `Average Bonus stats gained: ${var1}`;
      default:
        return `${rune} - No additional information available`;
    }
}
export default getRuneTextAverage;
