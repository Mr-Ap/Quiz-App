using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuizAppServerWebAPI.Data;
using QuizAppServerWebAPI.Models;

namespace QuizAppServerWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ParticipantController : ControllerBase
    {
        private readonly QuizDbContext _context;

        public ParticipantController(QuizDbContext context)
        {
            _context = context;
        }

        // GET: api/Participant
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Participant>>> GetParticipants()
        {
          if (_context.Participants == null)
          {
              return NotFound();
          }
            return await _context.Participants.ToListAsync();
        }

        // GET: api/Participant/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Participant>> GetParticipant(int id)
        {
          if (_context.Participants == null)
          {
              return NotFound();
          }
            var participant = await _context.Participants.FindAsync(id);

            if (participant == null)
            {
                return NotFound();
            }

            return participant;
        }

        // PUT: api/Participant/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutParticipant(int id, ParticipantResult participantResult)
        {
            if (id != participantResult.ParticipantId)
            {
                return BadRequest();
            }

            Participant participant = await _context.Participants.FindAsync(id);
            participant.TimeTaken=participantResult.TimeTaken;
            participant.Score=participantResult.Score;

            _context.Entry(participant).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ParticipantExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Participant
        [HttpPost]
        public async Task<ActionResult<Participant>> PostParticipant(Participant participant)
        {
          if (_context.Participants == null)
          {
              return Problem("Entity set 'QuizDbContext.Participants'  is null.");
          }
            var isParticipantExist = _context.Participants.Where(p => p.ParticipantId == participant.ParticipantId || p.Email == participant.Email).FirstOrDefault();
            if (isParticipantExist == null)
            {
                _context.Participants.Add(participant);
                await _context.SaveChangesAsync();
            }
            else
                participant = isParticipantExist;

            return CreatedAtAction("GetParticipant", new { id = participant.ParticipantId }, participant);
        }

        // DELETE: api/Participant/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteParticipant(int id)
        {
            if (_context.Participants == null)
            {
                return NotFound();
            }
            var participant = await _context.Participants.FindAsync(id);
            if (participant == null)
            {
                return NotFound();
            }

            _context.Participants.Remove(participant);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ParticipantExists(int id)
        {
            return (_context.Participants?.Any(e => e.ParticipantId == id)).GetValueOrDefault();
        }
    }
}
