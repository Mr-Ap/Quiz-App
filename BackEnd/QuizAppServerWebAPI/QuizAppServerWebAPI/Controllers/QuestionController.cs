﻿using System;
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
    public class QuestionController : ControllerBase
    {
        private readonly QuizDbContext _context;

        public QuestionController(QuizDbContext context)
        {
            _context = context;
        }

        // GET: api/Question
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Question>>> GetQuestions()
        {
          if (_context.Questions == null)
          {
              return NotFound();
          }
            var questions = await _context.Questions.Select(q => new
            {
                QnId = q.QnId,
                QnInWords = q.QnInWords,
                ImageName = q.ImageName,
                Options = new string[] { q.Option1, q.Option2, q.Option3, q.Option4 }
            }).ToListAsync();
            return Ok(questions);
        }

        // GET: api/Question/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Question>> GetQuestion(int id)
        {
          if (_context.Questions == null)
          {
              return NotFound();
          }
            var question = await _context.Questions.FindAsync(id);

            if (question == null)
            {
                return NotFound();
            }

            return question;
        }

        // PUT: api/Question/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutQuestion(int id, Question question)
        {
            if (id != question.QnId)
            {
                return BadRequest();
            }

            _context.Entry(question).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!QuestionExists(id))
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

        // POST: api/Question
        [HttpPost]
        public async Task<ActionResult<Question>> PostQuestion(Question question)
        {
          if (_context.Questions == null)
          {
              return Problem("Entity set 'QuizDbContext.Questions'  is null.");
          }
            _context.Questions.Add(question);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetQuestion", new { id = question.QnId }, question);
        }

        // POST: api/Question/GetAnswers
        [HttpPost]
        [Route("GetAnswers")]
        public async Task<ActionResult<Question>> GetAnswers(int[] qnIds)
        {
            var answers = await (_context.Questions.Where((q) => qnIds.Contains(q.QnId)).Select(q => new
            {
                q.QnId,
                q.QnInWords,
                q.ImageName,
                Options = new string[] { q.Option1, q.Option2, q.Option3, q.Option4 },
                q.Answer
            }).ToListAsync());
            return Ok(answers);

        }

        // DELETE: api/Question/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuestion(int id)
        {
            if (_context.Questions == null)
            {
                return NotFound();
            }
            var question = await _context.Questions.FindAsync(id);
            if (question == null)
            {
                return NotFound();
            }

            _context.Questions.Remove(question);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool QuestionExists(int id)
        {
            return (_context.Questions?.Any(e => e.QnId == id)).GetValueOrDefault();
        }
    }
}
